import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ColumnTypes } from '../enum/table.enum';
import { IColumn, IFilter, IQueryParams } from '../interface/table.interface';
import { TableService } from '../service/table.service';

import * as moment from 'moment';
import { fabButton } from '../types';

@Component({
  selector: 'ps-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  settingForm?: UntypedFormGroup;
  actions: fabButton[] = [];
  @Input() displayData: any[] = [];
  @Input() columns: any[] = [];
  @Input() detalheColumns?: any[] = [];
  @Input() hasDetalhe: boolean = false;
  @Input() pesquisar: (params: IQueryParams) => any[] | void = () => {};
  @Input() detalheColumnName!: string;
  // @Input({ required: true })
  // tableConfigOptions!: {
  //   displayData: any[];
  //   columns: any[];
  //   hasDetalhe: boolean;
  //   detalheColumns?: any[];
  //   pesquisar: (params: IQueryParams) => any[] | void;
  //   detalheColunmName: string;
  //   title: string;
  //   count: number;
  //   loading: boolean;
  //   expand: (item: any) => void;
  // };
  @Input() title!: string;
  @Input() count!: number;
  @Input() loading: boolean = false;

  @Output() check = new EventEmitter();
  @Input() expand!: (item: any) => void;
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  private pageSize: number = 10;
  private pageIndex: number = 1;
  selectFilter!: IColumn | any;
  selectFilterValue!: string | number;
  filters: IFilter[] | any[] = [];

  constructor(private service: TableService) {
    this.setOrdenator();
  }

  async getRegistrysWithFilters() {
    let params: IQueryParams = {} as IQueryParams;
    params.filters = this.filters;
    params.title = this.title;
    params.take = this.getPageSize();
    params.page = (this.getPageIndex() - 1) * this.getPageSize();
    params.all = this.filters.length === 0;
    this.pesquisar(params);
    this.checkAll(false);
  }

  isString(value: ColumnTypes): boolean {
    return value === ColumnTypes.STRING;
  }

  selecionarFiltro(event: any) {
    this.selectFilterValue = '';
  }

  addFilter() {
    this.filters.push({
      ...this.selectFilter,
      value: this.selectFilterValue,
      text: `${this.selectFilter.label} - ${this.selectFilterValue}`,
    });
    this.selectFilter = null;
    this.selectFilterValue = '';
  }

  isDetalheLoading(registry: any): boolean {
    return !registry[this.detalheColumnName];
  }

  onClose(data: any) {
    const index = this.filters.indexOf(data);
    if (index > -1) {
      this.filters.splice(index, 1);
    }
  }

  getChecked(): any[] | void {
    const registry = this.getCheckeds();
    if (registry.length === 0) {
      this.service.notification.warning(
        this.title,
        'Nenhum registro selecionado!'
      );
      return;
    }
    if (registry.length > 1) {
      this.service.notification.warning(
        this.title,
        'Muitos registros selecionados!'
      );
      return;
    }
    return registry[0];
  }

  getCheckeds(): any[] {
    return this.displayData?.filter((data) => data.checked) ?? [];
  }

  setOrdenator() {
    this.columns = this.columns.map((column) => {
      const ordenatorTypes: {
        [key: number]: ((a: any, b: any) => any) | null;
      } = {
        [ColumnTypes.STRING]: (a: any, b: any) =>
          a[column.columnName].localeCompare(b[column.columnName]),
        [ColumnTypes.NUMBER]: (a: any, b: any) =>
          a[column.columnName] - b[column.columnName],
        [ColumnTypes.ACTION]: null,
      };
      return {
        ...column,
        ordenator: [ColumnTypes.STRING, ColumnTypes.DATE].includes(column.type)
          ? (a: any, b: any) =>
              a[column.columnName].localeCompare(b[column.columnName])
          : (a: any, b: any) => a[column.columnName] - b[column.columnName],
      };
    });
  }

  setPageSize(event: number) {
    this.pageSize = event;
    this.getRegistrysWithFilters();
  }
  getPageSize(): number {
    return this.pageSize;
  }
  setPageIndex(event: number) {
    this.pageIndex = event;
    this.getRegistrysWithFilters();
  }
  getPageIndex(): number {
    return this.pageIndex;
  }

  getPageTotal(): number {
    const table: Array<any> = this.displayData;
    return table?.length;
  }

  expandTableRow(data: any) {
    // this.displayDataEvent.emit('Olá, mundo!');
    // this.expand.emit(data);
    // data.expanded = !data.expanded;
  }

  refreshStatus(registry?: any): void {
    this.check.emit({
      checked: registry,
      displayData: this.displayData,
      checkeds: this.getCheckeds(),
    });
    const validData = this.displayData.filter((value) => !value.disabled);
    const allChecked =
      validData.length > 0 &&
      validData.every((value) => value.checked === true);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    if (this.displayData && this.displayData.length !== 0) {
      this.displayData.forEach((data) => {
        if (!data.disabled) {
          data.checked = value;
        }
      });
      this.refreshStatus();
    }
  }

  getCell(column: IColumn, data: any) {
    if (column.visible) {
      if (column.type === ColumnTypes.DATE) {
        return data[column.columnName]
          ? moment(data[column.columnName]).format('DD/MM/YYYY - HH:mm')
          : null;
      }
      return data[column.columnName];
    }
    // return column.visible ? data[column.columnName] : null;
  }

  ngOnInit(): void {
    this.setOrdenator();

    // if (this.displayData.length === 0) {
    // this.getRegistrysWithFilters();
    // }
  }
}
