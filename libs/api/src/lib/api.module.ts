import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonApiModule } from './common/common-api.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [CommonModule, UserModule, CommonApiModule],
  providers: [],
})
export class ApiModule {}
