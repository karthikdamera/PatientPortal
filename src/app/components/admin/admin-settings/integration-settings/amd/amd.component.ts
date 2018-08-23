import { Component, OnInit, EventEmitter, ViewContainerRef, Output } from '@angular/core';

import { AdminSettingsService } from '../../admin-settings.service';
import { Toast, ToastsManager } from 'ng2-toastr';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../../../shared/validation/validation.service';
import { Router } from '@angular/router';
import { IntigrationModel } from '../../../admin-settings.model';

@Component({
  selector: 'app-amd',
  templateUrl: './amd.component.html',
  styleUrls: ['./amd.component.scss'],
  providers: [AdminSettingsService]
})
export class AmdComponent implements OnInit {
  @Output() getehrtypeCall = new EventEmitter();
  obj = {
    type: 'AMD'
  };
  intigrationamdmodel: IntigrationModel;
  intigrationamdForm: any;
  ehrtypeamd: string;
  constructor(private router: Router, private _adminsettingservice: AdminSettingsService,
    public toastr: ToastsManager, vcr: ViewContainerRef, private formBuilder: FormBuilder) {
        this.ehrtypeamd = 'AMD';
      this.toastr.setRootViewContainerRef(vcr);
      this.intigrationamdmodel = new IntigrationModel();
      this.intigrationamdForm = this.formBuilder.group({
        'EhrType': [''],
        'LoginUrl': ['', Validators.required],
        'UserName': ['', [Validators.required, Validators.maxLength(50)]],
        'Password': ['', [Validators.required, Validators.maxLength(20)]],
        'OfficeKey': ['', [Validators.required, Validators.maxLength(100)]],
        'AppName': ['', Validators.required]
        // 'APIkey': ['', [Validators.required, Validators.maxLength(100)]],
        // 'ServiceAPIurl': ['', Validators.required],
    });
     }

  ngOnInit() {
    // localStorage.setItem('ehartype', 'ehrAMDEthena');
    console.log('anu');
    this.getintigrationamddata();
  }
  getintigrationamddata() {
    return this._adminsettingservice.getintigartiondata().subscribe(
        res => {
           if (res.data.EhrType === 'AMD') {
            this.intigrationamdmodel = res.data;
            console.log(this.intigrationamdmodel);
           }
        }

    );

}
updateintigrationamdsettings() {
    this.intigrationamdmodel.EhrType = 'AMD';
    this._adminsettingservice.postintigartiondata(this.intigrationamdmodel).subscribe(
        res => {
            if (res.success = true) {
                // this.orgmodel=new OrganisationModel();
                this.Success('AMD Info Updated');
            } else {
              this.Error(res.data, '');
          }
        });
}
Success(successmsg) {
    this.toastr.success(successmsg, null, {
        dismiss: 'controlled', showCloseButton: true,
        positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
        showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
        'debug': false, 'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
        setTimeout(() => {
            this.toastr.dismissToast(toast);
            this.intigrationamdmodel = new IntigrationModel();
            // this.credentialtype = '';
             this.getintigrationamddata();
        }, 2000);
    });
}
Error(errormsg, type) {
    this.toastr.error(errormsg, null, {
        dismiss: 'controlled', showCloseButton: true,
        positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
        showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
        'debug': false, 'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
        setTimeout(() => {
            this.toastr.dismissToast(toast);
        }, 2000);
    });
}
back() {
  this.getehrtypeCall.emit(this.obj);
 // localStorage.setItem('ehartype', 'AMD');
 // this.router.navigate(['./admin-setting']);
}
}
