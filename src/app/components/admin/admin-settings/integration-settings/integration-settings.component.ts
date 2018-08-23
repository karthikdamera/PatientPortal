import { Component, OnInit, ViewContainerRef } from '@angular/core';
// import { IntigrationModel } from '../admin-settings.model';
import { AdminSettingsService } from '../admin-settings.service';
import { Toast, ToastsManager } from 'ng2-toastr';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { IntigrationModel } from '../../admin-settings.model';

@Component({
    selector: 'app-integration-settings',
    templateUrl: './integration-settings.component.html',
    styleUrls: ['./integration-settings.component.scss'],
    providers: [AdminSettingsService]
})
export class IntegrationSettingsComponent implements OnInit {
    intigrationmodel: IntigrationModel;
    ehrtypeempty: boolean;
    credentialtype: string;
    ehrtypeamd: boolean;
    constructor(private _adminsettingservice: AdminSettingsService) {
        this.intigrationmodel = new IntigrationModel();
this.credentialtype = '';
this.ehrtypeamd = false;
this.ehrtypeempty = false;
    }

    ngOnInit() {
        this.ehrtypeamd = false;
        this.credentialtype = '';
        this.getehrtype();
    }
    ehrtype(credentialvalue) {
        this.ehrtypeamd = false;
        if (credentialvalue === 'AMD') {
            this.credentialtype = 'AMD';
        } else if (credentialvalue === 'Athena') {
            this.credentialtype = 'Athena';
        }

    }
    getehrtype() {
        return this._adminsettingservice.getintigartiondata().subscribe(
            res => {
                this.intigrationmodel = res.data;
                if (this.intigrationmodel.EhrType === '' || this.intigrationmodel.EhrType === null ||
                 this.intigrationmodel.EhrType === 'null') {
                    this.ehrtypeempty = true;
                    // alert(this.ehrtypeempty);
                }
             //   console.log('aaaa' + this.intigrationmodel.EhrType);
            }
        );
    }
    EHREvent(obj) {
      //  console.log(obj.type);
        if ((obj.type === 'AMD') || (obj.type === 'Athena')) {
        this.ehrtypeamd = true;
        this.credentialtype = '';
        this.ehrtypeempty = false;
        this.getehrtype();
        }

    }
}
