import { Component, Input, OnInit } from '@angular/core';
import { ISideMenu } from '../types/menu.type';

@Component({
  selector: 'gs-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  @Input()
  public sideMenu!: ISideMenu[];

  @Input()
  public isCollapsed!: boolean;
  ngOnInit(): void {}
}
