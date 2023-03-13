import { Component } from '@angular/core';
import { ToastService } from '../../../service/toast.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(
    private service: ToastService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.service.toastMessage.subscribe((res) => {
      this.showSuccess(res);
    });
  }
  showSuccess(res: any) {
    this.messageService.clear();
    if (res.toastMessages.ok) {
      this.messageService.add({
        severity: 'success',
        summary: res.toastMessages.status,
        detail: res.toastMessages.statusText,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: res.toastMessages.status,
        detail: res.toastMessages.statusText,
      });
    }
  }
}
