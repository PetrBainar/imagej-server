import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Fiji WebClient';

  private subscriptions: Subscription[] = [];

  constructor (private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.notificationService.modalDialogRequestedNotification.subscribe(() => {
        alert('ahoj');
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
