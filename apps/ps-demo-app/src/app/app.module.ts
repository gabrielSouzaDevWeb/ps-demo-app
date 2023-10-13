import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonUiModule } from '@ps-demo-app/common-ui';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { PermissaoComponent } from './application/permissao/permissao.component';
import { CommonAppModule } from './common/common.module';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  declarations: [AppComponent, PermissaoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NzModalModule,
    NzGridModule,
    CommonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    CommonUiModule,
    CommonAppModule,
    BrowserModule,
    CommonUiModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
