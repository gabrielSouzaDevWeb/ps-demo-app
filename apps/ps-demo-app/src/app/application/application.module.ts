import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [],

  imports: [
    NzGridModule,
    CommonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ApplicationModule {}
