/**
 * QDnCo public booking-forecast model. This is an assumption-led planning
 * scenario, not an outcome guarantee. Data definitions live in
 * /data/booking-forecast-model.json so the UI and downstream consumers share
 * one machine-readable contract.
 */
export function calculateForecast(model, input) {
  const budget = Number(input.budgetInr);
  const metaShare = Number(input.metaShare);
  if (!Number.isFinite(budget) || budget < model.limits.budgetMin || budget > model.limits.budgetMax) {
    throw new RangeError(`Monthly budget must be between ₹${model.limits.budgetMin.toLocaleString('en-IN')} and ₹${model.limits.budgetMax.toLocaleString('en-IN')}.`);
  }
  if (!Number.isFinite(metaShare) || metaShare < 0 || metaShare > 1) {
    throw new RangeError('Meta share must be between 0% and 100%.');
  }
  const ticket = model.ticketBands[input.ticketBand];
  const speed = model.followUpSpeed[input.followUpSpeed];
  if (!ticket || !speed) throw new RangeError('Choose a valid ticket band and follow-up speed.');
  const shares = { meta: metaShare, google: 1 - metaShare };
  const round = (value) => Math.round(value);
  const aggregate = (rows) => {
    const sum = (key) => rows.reduce((total, row) => total + row[key], 0);
    const spendInr = sum('spendInr');
    const leads = sum('leads');
    const qualifiedLeads = sum('qualifiedLeads');
    const siteVisits = sum('siteVisits');
    return {
      spendInr,
      costPerLeadInr: leads ? round(spendInr / leads) : null,
      leads,
      qualificationRate: leads ? qualifiedLeads / leads : null,
      qualifiedLeads,
      siteVisits,
      bookings: Math.round(sum('bookings') * 10) / 10,
      qualifiedToVisitRate: qualifiedLeads ? siteVisits / qualifiedLeads : null,
      visitToBookingRate: siteVisits ? sum('bookings') / siteVisits : null,
    };
  };
  const monthly = Object.entries(model.months).map(([monthNumber, base]) => {
    const channels = {};
    for (const [channelName, share] of Object.entries(shares)) {
      const channel = model.channels[channelName];
      const spendRaw = budget * share * base.liveDayShare;
      const cplRaw = base.blendedCplInr * channel.cplMultiplier * ticket.cplMultiplier;
      const leadsRaw = cplRaw > 0 ? spendRaw / cplRaw : 0;
      const qualification = Math.max(model.limits.qualificationMin, Math.min(
        model.limits.qualificationMax,
        base.qualificationRate + channel.qualificationPointAdjustment,
      ));
      const qualifiedRaw = leadsRaw * qualification;
      const visitsRaw = qualifiedRaw * base.qualifiedToVisitRate * speed.siteVisitMultiplier;
      const bookingsRaw = visitsRaw * base.visitToBookingRate * ticket.visitToBookingMultiplier;
      channels[channelName] = {
        spendInr: round(spendRaw),
        costPerLeadInr: round(cplRaw),
        leads: round(leadsRaw),
        qualificationRate: qualification,
        qualifiedLeads: round(qualifiedRaw),
        siteVisits: round(visitsRaw),
        bookings: Math.round(bookingsRaw * 10) / 10,
      };
    }
    return { month: Number(monthNumber), channels, both: aggregate(Object.values(channels)) };
  });

  const channelRows = {};
  for (const channelName of Object.keys(shares)) {
    channelRows[channelName] = monthly.map((row) => row.channels[channelName]);
  }
  const combinedRows = monthly.map((row) => row.both);
  const threeMonthTotals = aggregate(combinedRows);
  const monthThree = combinedRows[2];
  const unitsLeft = input.unitsLeft === '' || input.unitsLeft == null ? null : Number(input.unitsLeft);
  if (unitsLeft != null && (!Number.isInteger(unitsLeft) || unitsLeft < 1 || unitsLeft > 5000)) {
    throw new RangeError('Units left must be a whole number from 1 to 5,000.');
  }

  return {
    monthly,
    totals: {
      meta: aggregate(channelRows.meta),
      google: aggregate(channelRows.google),
      both: threeMonthTotals,
    },
    monthThree,
    threeMonthTotals,
    costPerSiteVisitMonthThreeInr: monthThree.siteVisits ? round(monthThree.spendInr / monthThree.siteVisits) : null,
    monthsToSellOutAtMonthThreePace: unitsLeft == null || monthThree.bookings <= 0 ? null : Math.ceil(unitsLeft / monthThree.bookings),
    unitsLeft,
  };
}
