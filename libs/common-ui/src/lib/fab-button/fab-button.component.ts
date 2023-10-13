import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fabButton } from '../types';

@Component({
  selector: 'ps-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabButtonComponent {
  isExpand: boolean = false;
  @Input() actions: fabButton[] = [];
  constructor() {}

  ngOnInit() {}

  getActions(): fabButton[] {
    return this.actions;
  }

  isSigleBtn(): boolean {
    return this.actions.filter((action) => action.condition).length === 1;
  }

  actionValid(): fabButton {
    return this.actions.find((action) => action.condition) ?? this.actions[0];
  }

  executeFunction(action: fabButton): void {
    action.changeContext ? (this.isExpand = false) : (this.isExpand = true);
    window.scrollTo(0, 0);
    action.func();
  }
}
