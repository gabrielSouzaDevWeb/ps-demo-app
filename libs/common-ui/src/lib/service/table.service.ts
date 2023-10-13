import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public notification!: NzNotificationService;
  constructor(notification: NzNotificationService) {}
}
