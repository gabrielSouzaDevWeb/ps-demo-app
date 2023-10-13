import { Inject, Injectable } from '@angular/core';
import { PermissaoApiService } from 'libs/api/src/lib/user/permissao-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { PermissaoState } from '../states/permissao.state';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  private titulo = 'Permissões';
  constructor(
    @Inject('PERMISSAO_STATE') private readonly permissaoState: PermissaoState,
    private readonly permissaoApiService: PermissaoApiService,
    private notification: NzNotificationService
  ) {}

  get permissao$(): Observable<Array<unknown & { id: number }>> {
    return this.permissaoState.permissoes$;
  }

  private updateStatePermissoes(permissoes: Array<unknown & { id: number }>) {
    //
    /**
     * regra de negocio para atualizar
     * exemplo:  adicionar checkbox e expand
     */
    this.permissaoState.permissoes = permissoes;
  }

  public pesquisarPermissoes(): void {
    //regra para executar consulta
    const subscription: Subscription = this.permissaoApiService
      .getMany<unknown & { id: number }>()
      .pipe
      // map((permissoes) => {
      //   return permissoes.map((permissao) => {
      //     return { ...permissao, checked: false };
      //   });
      // })
      ()
      .subscribe({
        next: (permissoes: Array<unknown & { id: number }>) => {
          this.updateStatePermissoes(permissoes);
        },
        error: (error) => {
          this.notification.error(this.titulo, error.message);
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });
  }

  public criarPermissao(permissao: unknown): void {
    const subscription: Subscription = this.permissaoApiService
      .post<unknown>(permissao)
      .subscribe({
        next: (permissao: unknown & { id: number }) => {
          this.permissaoState.addPermissao(permissao);
        },
        error: (error) => {
          this.notification.error(this.titulo, error.message);
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });
  }

  public editarPermissao(permissao: unknown & { id: number }): void {
    const subscription: Subscription = this.permissaoApiService
      .put<unknown & { id: number }>(permissao)
      .subscribe({
        next: (permissao: unknown & { id: number }) => {
          this.permissaoState.updatePermissao(permissao);
        },
        error: (error) => {
          this.notification.error(this.titulo, error.message);
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });
  }

  public deletarPermissao(permissao: unknown & { id: number }): void {
    this.validarDeletarEditar(permissao);
    const subscription: Subscription = this.permissaoApiService
      .delete(permissao)
      .subscribe({
        next: () => {
          this.permissaoState.deletePermissao(permissao);
        },
        error: (error) => {
          this.notification.error(this.titulo, error.message);
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });
  }

  private validarDeletarEditar(permissao?: unknown & { id: number }): boolean {
    //exemplo de validação
    // this.permissaoState.permissoes.filter((permissao) => permissao.checked);
    return false;
  }
}
