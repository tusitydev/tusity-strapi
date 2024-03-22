export interface Query {
  [x: string]: {
    populate?: Query | string[] | string | boolean;
    fields?: string[];
    start?: number;
    limit?: number;
    sort?: string[];
    filters?: Record<any, any>;
  };
}
