import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../common/utils/url';

@Injectable({
  providedIn: 'root',
})
export class PermissaoApiService extends Url {
  constructor(private readonly http: HttpClient) {
    super('ps-permissao-api', 'permissao');
  }

  public getMany<T extends unknown>(
    permissao?: Partial<T>
  ): Observable<Array<T>> {
    let filterParams: Array<string> = [];
    let query: string;

    if (permissao) {
      for (const permissaoKey in permissao) {
        filterParams.push(`${permissaoKey}=${permissao[permissaoKey]}`);
      }
      query = `?${filterParams.join('&')}`;
    }
    query = '';
    return this.http.get<Array<T>>(
      `${this.getUri()}${query}`,
      this.getHeader()
    );
  }

  public post<T extends unknown>(
    permissaoToPost: T & unknown
  ): Observable<T & { id: number }> {
    return this.http.post<T & { id: number }>(
      this.getUri(),
      permissaoToPost,
      this.getHeader()
    );
  }

  public put<T extends unknown & { id: number }>(
    permissaoToPut: Partial<T> & unknown & { id: number }
  ): Observable<T & { id: number }> {
    return this.http.put<T & { id: number }>(
      `${this.getUri()}/${permissaoToPut.id}`,
      permissaoToPut,
      this.getHeader()
    );
  }

  public delete<T extends unknown>(
    permissaoToDelete: Partial<T> & unknown & { id: number }
  ): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.getUri()}/${permissaoToDelete.id}`,
      this.getHeader()
    );
  }
}
