// Types for the estimate card. Checked by tests/estimate.test.mjs with
// TypeScript strict mode; the browser never loads this file.

export type MarketId = 'india' | 'dubai';
export type Kind = 'needs' | 'addons';

export interface CatalogItem {
  id: string;
  label: string;
  short: string;
  detail?: string;
  exclusive?: boolean;
}

export interface EstimateCatalog {
  version: string;
  endpoint: string;
  toolPath: string;
  contactEmail: string;
  whatsapp: string;
  budgetLabel: string;
  markets: Record<MarketId, { label: string }>;
  needs: CatalogItem[];
  addons: CatalogItem[];
}

export interface Selection {
  market: MarketId;
  needs: string[];
  addons: string[];
}

export interface ContactInput {
  name: string;
  phone: string;
  project: string;
}

export interface EstimateEngine {
  normalise(catalog: EstimateCatalog, raw: Partial<Selection>): Selection;
  toggle(catalog: EstimateCatalog, selection: Selection, kind: Kind, id: string): Selection;
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
