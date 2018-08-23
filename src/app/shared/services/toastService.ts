import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Injectable, ViewContainerRef } from '@angular/core';
import { alertType } from '../../models/common.model';

@Injectable()
export class ToastService {
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    public ShowAlert(message: string, title: string, messageType: string) {
       // alert();
        switch (messageType) {
            case 'Success':
                this.toastr.success(message, title, {
                    dismiss: 'controlled', showCloseButton: true,
                    positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
                    showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
                    'debug': false, 'hideEasing': 'linear',
                    'showMethod': 'fadeIn',
                    'hideMethod': 'fadeOut'
                }).then((toast: Toast) => {
                    setTimeout(() => {
                        this.toastr.dismissToast(toast);
                    }, 2000);
                });
                break;
            case 'Error':
                this.toastr.error(message, title, {
                    dismiss: 'controlled', showCloseButton: true,
                    positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
                    showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
                    'debug': false, 'hideEasing': 'linear',
                    'showMethod': 'fadeIn',
                    'hideMethod': 'fadeOut'
                }).then((toast: Toast) => {
                    setTimeout(() => {
                        this.toastr.dismissToast(toast);
                    }, 7000);
                });
                break;
            case 'Warning':
                this.toastr.warning(message, title, {
                    dismiss: 'controlled', showCloseButton: true,
                    positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
                    showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
                    'debug': false, 'hideEasing': 'linear',
                    'showMethod': 'fadeIn',
                    'hideMethod': 'fadeOut'
                });
                break;

        }

    }
}
