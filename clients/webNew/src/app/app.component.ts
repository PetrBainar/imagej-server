import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalDialogComponent } from './modal-dialog.component';

import { FijiDialog } from './fiji-dialog';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Fiji WebClient';

  private subscriptions: Subscription[] = [];

  @ViewChild('modal') modalDialogComponent: ModalDialogComponent;

  constructor (private notificationService: NotificationService) { }

  ngOnInit(): void {
    const component = this;
    this.subscriptions.push(
      this.notificationService.modalDialogRequestedNotification.subscribe((dialog: FijiDialog) => {
        component.modalDialogComponent.show(dialog.header, dialog.body);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
