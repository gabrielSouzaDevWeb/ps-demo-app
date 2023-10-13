import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TableComponent } from './table/table.component';
import { TemplateComponent } from './template/template.component';

const icons: IconDefinition[] = Object.values(AllIcons);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzLayoutModule,
    HttpClientModule,
    NzIconModule,
    CommonModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzNotificationModule,
    NzPaginationModule,
    NzCollapseModule,
    NzOverlayModule,
    NzToolTipModule,
    NzButtonModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzRadioModule,
    NzTableModule,
    NzDividerModule,
    NzMenuModule,
    NzAffixModule,
  ],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FabButtonComponent,
    TableComponent,
    TemplateComponent,
    SideMenuComponent,
    HeaderComponent,
  ],
  exports: [
    FabButtonComponent,
    TableComponent,
    TemplateComponent,
    SideMenuComponent,
    HeaderComponent,
  ],
})
export class CommonUiModule {}
