// checkin.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private hasCheckedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasCheckedIn$: Observable<boolean> = this.hasCheckedInSubject.asObservable();

  constructor() {}

  updateCheckinStatus(status: boolean): void {
    this.hasCheckedInSubject.next(status);
  }
}
