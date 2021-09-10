export interface ISearchResultObject {
  count: Number;
  next: null;
  previous: null;
  results: ISingleResult[];
}

export interface ISingleResult {
  isin: string;
  name:  string;
  symbol: string;
  title: string;
  type: string;
  wkn: string;
  venues: IVenue[];
}

export interface IVenue {
  name: string;
  title: string;
  mic: string;
  is_open: boolean;
  tradable: boolean;
  currency: "EUR" | "USD";
}

export interface IRegisterResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface ILoginCred {
  client_id: string
  client_secret: string
}