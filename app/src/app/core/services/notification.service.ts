// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AlertType } from '@/shared/components/alert.component';

@Injectable()
export class NotificationService {
  private _subject = new Subject<[AlertType, string]>();

  notification$ = this._subject.asObservable();

  public notify(type: AlertType, message: string): void {
    this._subject.next([type, message]);
  }
}
