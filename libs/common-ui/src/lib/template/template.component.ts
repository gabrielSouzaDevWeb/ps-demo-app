import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { ISideMenu } from '../types/menu.type';

@Component({
  selector: 'gs-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit, AfterContentInit {
  public isCollapsed: boolean = false;
  @ViewChild('nzSider', { static: true })
  private nzSider!: NzSiderComponent;

  @Input()
  public sideMenu!: ISideMenu[];
  @Input({ required: true })
  public title!: string;

  constructor() {}
  ngAfterContentInit(): void {
    this.nzSider.nzCollapsedChange.subscribe((event) => {
      this.isCollapsed = event;
    });
  }
  ngOnInit(): void {
    this.sideMenu[0].children?.length;
  }
}
