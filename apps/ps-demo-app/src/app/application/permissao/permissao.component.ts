import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IColumn, IDisplayDataState, fabButton } from '@ps-demo-app/common-ui';
import { ColumnTypes } from 'libs/common-ui/src/lib/enum/table.enum';
import { Subscription, map } from 'rxjs';
import { PermissaoService } from '../../common/services/permissao.service';

@Component({
  selector: 'ps-demo-app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss'],
})
export class PermissaoComponent implements OnInit, OnDestroy {
  public fabButton!: fabButton[];
  private permissoesSub!: Subscription;
  private DisplayDataState!: IDisplayDataState<unknown>;
  public displayData: Array<unknown> = [];
  isVisible = false;
  public formPermissao!: FormGroup;
  public columns: IColumn[] = [
    {
      columnName: 'id',
      label: 'id',
      seachable: true,
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      columnName: 'username',
      label: 'nome',
      seachable: true,
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      columnName: 'adm',
      label: 'administrador',
      seachable: false,
      type: ColumnTypes.NUMBER,
      visible: true,
    },
  ];
  public loadingTable: boolean = false;
  title: any;
  count: any;

  constructor(
    private permissaoService: PermissaoService,
    private formBuilder: FormBuilder
  ) {
    this.buildformStudent();
    this.buildFabButtons();
  }

  private buildformStudent() {
    this.formPermissao = this.formBuilder.group({
      username: [null],
      id: [null],
      adm: [null],
    });
  }

  private buildFabButtons() {
    this.fabButton = [
      {
        condition: true,
        func: () => {
          this.formPermissao.reset();
        },
        label: 'limpar',
        icon: 'clear',
      },
      {
        condition: true,
        func: this.criar,
        label: 'Nova permissao',
        icon: 'plus',
      },
      {
        condition: true,
        func: this.salvar,
        label: 'Nova permissao',
        icon: 'save',
      },
      {
        condition: true,
        func: this.editar,
        label: 'editar',
        icon: 'edit',
      },
      {
        condition: true,
        func: this.deletar,
        label: 'deletar',
        icon: 'delete',
      },
      {
        condition: true,
        func: this.atualizar,
        label: 'atualizar',
        icon: 'reload',
      },
      // {
      //   condition: true,
      //   func: this.pesquisar,
      //   label: 'atualizar',
      //   icon: 'reload',
      // },
    ];
  }

  private criar = () => {
    this.isVisible = true;
  };

  private salvar = (): void => {
    //validacao
    if (this.formPermissao.value.id)
      return this.permissaoService.editarPermissao(
        this.formPermissao.value as unknown & { id: number }
      );

    this.permissaoService.criarPermissao(this.formPermissao.value as unknown);
    this.formPermissao.reset();
    this.handleCancel();
  };
  public pesquisar = (): void => {
    this.permissaoService.pesquisarPermissoes();
  };

  private editar = () => {
    this.formPermissao.patchValue(this.lastCheck());
    this.showModal();
    // this.permissaoService.editarPermissao({} as unknown & { id: number});
  };

  private deletar = () => {
    this.permissaoService.deletarPermissao(
      this.lastCheck() as unknown & { id: number }
    );
  };

  private atualizar = () => {
    this.pesquisar();
  };

  ngOnInit(): void {
    console.log('init');
    this.permissoesSub = this.permissoesSubscription();
  }
  ngOnDestroy(): void {
    this.permissoesSub.unsubscribe();
  }

  private permissoesSubscription(): Subscription {
    return this.permissaoService.permissao$
      .pipe(
        map((permissoes: Array<unknown & { id: number }>) => {
          return permissoes.map((permissao: unknown & { id: number }) => {
            return { ...permissao, checked: false };
          });
        })
      )
      .subscribe({
        next: (permissoes) => {
          console.log(permissoes);
          this.displayData = permissoes;
        },
      });
  }

  check($event: IDisplayDataState<unknown>) {
    this.DisplayDataState = $event;
  }
  private lastCheck(): unknown & { id: number } {
    return this.DisplayDataState.checked as unknown & { id: number };
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public handleOk(): void {
    this.salvar();
  }

  public handleCancel(): void {
    this.isVisible = false;
  }

  public changeVisible(): void {
    this.isVisible = !this.isVisible;
  }
}
