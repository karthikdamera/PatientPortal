import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminDashboardService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     * Get call for staff roles
     */
    getProgressChart(fmdt, todt) {
        const url = 'api/ProgressChart/GetAppointmentProgressChart?fromDate=' + fmdt + '&toDate=' + todt;
        return this.get(url);
    }
    /**
     * Posting the provider designation data
     * @param opt:post data of provider designation
     */
    getHistoryChart(dt) {
        const url = 'api/HistoryChart/GetAppointmentHistoryChart?date=' + dt;
        return this.get(url);
    }
    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = '01';
        month[1] = '02';
        month[2] = '03';
        month[3] = '04';
        month[4] = '05';
        month[5] = '06';
        month[6] = '07';
        month[7] = '08';
        month[8] = '09';
        month[9] = '10';
        month[10] = '11';
        month[11] = '12';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }

    getMonthName(d) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const n = monthNames[d.getMonth()];
        // console.log(n);
        return n;
    }
}


