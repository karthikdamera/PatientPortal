import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Api } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { AdminHeaderComponent } from '../../../shared/layouts/admin/admin-header/admin-header.component';
@Injectable()
export class StaffService extends AdminBaseService {
    private subject = new Subject<any>();

    constructor(private http: HttpClient) {
        super(http);

    }
    /**
     * To get staff Designations
     */
    GetDesignations() {
        const url = 'api/Designation/GetStaffRoles';
        return this.get(url);
    }
    /**
     * To get all the staff list
     *
    /**
     * To post the staff information
     * @param providerData
     */
    postStaffInfo(providerData) {
        //  alert(JSON.stringify(providerData));
        const url = 'api/Provider/Save';
        return this.post(url, providerData);

    }
    getadminProfile(id) {
        const url = 'api/Provider/GetStaffById?Id=' + id;
        return this.get(url);
    }
    sendimage(image) {
        console.log('anu' + image);
        this.subject.next({image: 'http://images.scheduler.live/PatientPortalDev//1/Sliders/ac88173d-828a-4161-a160-e7d220a2013a.jpeg'});
        console.log(this.getimage());
    }
    getimage(): Observable<any> {
        // alert("send");
        return this.subject.asObservable();
        // this.adminheader.
    }

    getDashBoardCounts(fromDate, toDate) {
        const url = 'api/Dashboard/GetDashboardData?fromDate=' + fromDate + '&toDate=' + toDate;
        return this.get(url);
    }
}
