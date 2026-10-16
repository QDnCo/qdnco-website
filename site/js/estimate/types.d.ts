// Types for the estimate card. Checked by tests/estimate.test.mjs with
// TypeScript strict mode; the browser never loads this file.

export type MarketId = 'india' | 'dubai';
export type RateKey = 'developer' | 'channelPartner';

export interface Role {
  id: string;
  label: string;
  dubaiLabel?: string;
  group: 'client' | 'other';
  rateKey?: RateKey;
}

export interface Service {
  id: string;
  label: string;
  priced?: boolean;
}

export interface Addon {
  id: string;
  label: string;
  short: string;
}

export interface EstimateCatalog {
  version: string;
  endpoint: string;
  toolPath: string;
  contactEmail: string;
  whatsapp: string;
  budgetLabel: string;
  maxCount: number;
  markets: Record<MarketId, { label: string }>;
  roles: Role[];
  services: Service[];
  rates: Record<RateKey, number[]>;
  dubai: { aedBase: number; inrBase: number };
  addons: Addon[];
}

export interface Selection {
  market: MarketId;
  role: string;
  service: string;
  count: number;
  addons: string[];
}

export interface Tier {
  label: string;
  amount: number;
}

export type Quote =
  | {
      priced: true;
      market: MarketId;
      currency: 'INR' | 'AED';
      roleLabel: string;
      perUnit: number;
      total: number;
      count: number;
      countLabel: string;
      unit: 'campaign' | 'project';
      isFloor: boolean;
      tiers: Tier[];
    }
  | { priced: false; isClient: boolean; roleLabel: string };

export interface ContactInput {
  name: string;
  phone: string;
  project: string;
}

export interface EstimateEngine {
  normalise(catalog: EstimateCatalog, raw: Partial<Selection>): Selection;
  toggleAddon(selection: Selection, id: string): Selection;
  quote(catalog: EstimateCatalog, selection: Selection): Quote;
  formatMoney(currency: 'INR' | 'AED', amount: number): string;
  summaryText(catalog: EstimateCatalog, selection: Selection): string;
  buildLead(catalog: EstimateCatalog, selection: Selection, input: ContactInput, source: string): Record<string, string>;
  validPhone(phone: string): boolean;
  toQuery(selection: Selection): string;
  fromQuery(search: string): Partial<Selection>;
}

export interface LeadCaptureApi {
  send(endpoint: string, lead: Record<string, string>): Promise<unknown>;
  context(pageUrl: string, referrer: string): Record<string, string>;
  requestId(): string;
}

declare global {
  var QDEstimateCatalog: EstimateCatalog | undefined;
  var QDEstimate: EstimateEngine | undefined;
  var QDEstimateWidget: { mountAll(scope?: ParentNode): void } | undefined;
  var QDLeadCapture: LeadCaptureApi | undefined;
}
