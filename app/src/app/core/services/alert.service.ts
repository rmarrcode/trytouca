// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Alert, AlertType } from '@/shared/components/alert.component';

export enum AlertKind {
  ApiConnectionDown = 1,
  ApiConnectionLost,
  InvalidAuthToken,

  TeamNotFound,
  SuiteNotFound,
  BatchNotFound,
  ElementNotFound
  // SuiteEmpty,
  // DstSuiteNotFound,
  // DstBatchNotFound,
  // DstElementNotFound,
  // DstSuiteEmpty
}

export type ServiceAlert = Alert & {
  kind: AlertKind;
};

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alerts = new Set<AlertKind>();
  private _alertsSubject = new Subject<ServiceAlert[]>();
  alerts$ = this._alertsSubject.asObservable();

  private _alertList: ServiceAlert[] = [
    { kind: AlertKind.ApiConnectionDown, type: AlertType.Danger, text: '' },
    {
      kind: AlertKind.ApiConnectionLost,
      type: AlertType.Warning,
      text:
        'Some of our services are not available at this time. ' +
        'Please allow some time for these services to be restored.'
    },
    { kind: AlertKind.InvalidAuthToken, type: AlertType.Danger, text: '' },
    { kind: AlertKind.TeamNotFound, type: AlertType.Danger, text: '' },
    { kind: AlertKind.SuiteNotFound, type: AlertType.Danger, text: '' },
    { kind: AlertKind.BatchNotFound, type: AlertType.Danger, text: '' },
    { kind: AlertKind.ElementNotFound, type: AlertType.Danger, text: '' }
  ];

  private publish(): void {
    const alerts = Array.from(this._alerts).map((v) => {
      return (
        this._alertList.find((k) => k.kind === v) || {
          kind: v,
          type: AlertType.Info,
          text: ''
        }
      );
    });
    this._alertsSubject.next(alerts);
  }

  public set(...keys: AlertKind[]): void {
    for (const key of keys) {
      this._alerts.add(key);
    }
    this.publish();
  }

  public unset(...keys: AlertKind[]): void {
    for (const key of keys) {
      this._alerts.delete(key);
    }
    this.publish();
  }

  public reset() {
    this._alerts.clear();
    this.publish();
  }
}
