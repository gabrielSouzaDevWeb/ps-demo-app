import { HttpHeaders } from '@angular/common/http';

export class Url {
  constructor(
    protected readonly apiName: string,
    protected readonly entityName: string
  ) {}

  protected getUri(entity: string = this.entityName): string {
    const uris: { [key: string]: string } = {
      [`user`]: this.getUriByEnviroment({
        port: 3000,
      }),
      [`permissao`]: this.getUriByEnviroment({
        port: 3000,
      }),
    };

    return uris[entity];
  }

  protected getUriByEnviroment(uri: {
    port: number;
    entity?: string;
    api?: string;
  }): string {
    const { port, entity = this.entityName, api = this.apiName } = uri;
    //TODO: enviroment
    return `http://localhost:${port}/${entity}`;
  }

  protected getHeader(authToken: string = 'uuid-mock-token-uuid'): {
    headers: HttpHeaders;
  } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ['x-authorication']: authToken,
      }),
    };
  }

  protected getEntity(entity: string = this.entityName): string {
    return this.getUri(entity);
  }

  protected getUrl(url?: string, entity: string = this.entityName): string {
    return `${this.getUri(entity)}${
      url ? (url?.startsWith('&') ? url : `/${url}`) : ''
    }`;
  }
}
