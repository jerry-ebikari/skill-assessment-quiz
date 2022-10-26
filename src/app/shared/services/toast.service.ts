import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(title: string, message = "") {
    this.toastrService.success(message, title);
  }

  showError(title: string, message = "") {
    this.toastrService.error(message, title);
  }

  showInfo(title: string, message = "") {
    this.toastrService.info(message, title);
  }
}
