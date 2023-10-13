import { BehaviorSubject, Observable } from 'rxjs';

export class PermissaoState {
  /**
   * NOTE: Toda instância de BehaviorSubject<T>(firstValue as T) deve
   * conter três métodos de manipulação e que atendam as seguintes
   * especificações:
   * 1°: Deve ter seu acesso controlado por métodos getters and setters,
   *      não sendo possível o acesso direto.
   * 2°: Deve retorne um observable da instância (get)
   * 3°: Deve emitir um valor para o obeservable descrito na 2° especificação (set)
   * 4°: Deve retorne o último valor settado (get)
   */
  private _permissoes$ = new BehaviorSubject<Array<unknown & { id: number }>>(
    []
  );

  constructor() {}

  public addPermissao(permissao: unknown & { id: number }): void {
    const currentPermissoes = this.permissoes;
    this.permissoes = [...currentPermissoes, permissao];
  }

  public updatePermissao(permissaoToUpdate: unknown & { id: number }) {
    const currentPermissoes = this.permissoes;
    const permissaoToUpdateIndex = currentPermissoes.findIndex(
      (permissao: unknown & { id: number }) => permissao.id === permissao.id
    );
    this.permissoes[permissaoToUpdateIndex] = permissaoToUpdate;
  }

  public deletePermissao(permissaoToDelete: unknown & { id: number }) {
    this.permissoes = this.permissoes.filter(
      (permissao: unknown & { id: number }) =>
        permissaoToDelete.id !== permissao.id
    );
  }

  public get permissoes$(): Observable<Array<unknown & { id: number }>> {
    return this._permissoes$.asObservable();
  }

  public get permissoes(): Array<unknown & { id: number }> {
    return this._permissoes$.getValue();
  }

  public set permissoes(permissoes: Array<unknown & { id: number }>) {
    this._permissoes$.next(permissoes);
  }
}
