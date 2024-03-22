export interface Ctx {
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    header: {
      host: string;
      'user-agent': string;
      authorization: string;
      accept: string;
    };
  };
  response: {
    status: number;
    message: string;
    header: Record<string, string>;
    // body:
  };
  app: { subdomainOffset: number; proxy: false | true; env: string };
  originalUrl: string;
  req: string;
  res: string;
  socket: string;
  badRequest: (string: string) => string;
}
