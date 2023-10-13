import { Component, Input } from '@angular/core';

@Component({
  selector: 'gs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input({ required: true })
  public title!: string;
}
