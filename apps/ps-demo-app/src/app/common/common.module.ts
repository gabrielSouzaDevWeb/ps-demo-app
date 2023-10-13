import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModule } from '@ps-demo-app/api';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { PermissaoState } from './states/permissao.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, ApiModule, NzNotificationModule],
  providers: [{ provide: 'PERMISSAO_STATE', useClass: PermissaoState }],
})
export class CommonAppModule {}
