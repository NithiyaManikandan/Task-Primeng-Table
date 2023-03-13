import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface TOAST_STATE {
  toastMessages: string;
  showToast: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastMessage: Subject<TOAST_STATE> = new Subject<TOAST_STATE>();
  constructor() {}

  showToast$(message: any) {
    if (message) {
      this.toastMessage.next({
        toastMessages: message,
        showToast: true,
      });
    }
  }
  dismissToast() {
    this.toastMessage.next({
      toastMessages: '',
      showToast: false,
    });
  }
}
