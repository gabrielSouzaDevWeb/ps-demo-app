import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissaoApiService } from './permissao-api.service';

@NgModule({
  imports: [CommonModule],
  providers: [PermissaoApiService],
})
export class UserModule {}
