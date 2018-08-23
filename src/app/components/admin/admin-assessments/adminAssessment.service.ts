import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';
import { Http , Response} from '@angular/http';
@Injectable()
export class AdminAssessmentService extends AdminBaseService {
    constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    postAssessmentSchedule(sch) {
        const url = 'api/PatientAssessment/Schedule';
        // alert(url);
        return this.post(url, sch);
    }

    // <-------scheduleing service end------->
    // <--------status update service start------>
    postAssessmentUpdateStatus(updatests) {
        //  alert();
        const statusurl = 'api/PatientAssessment/UpdateStatus';
        return this.post(statusurl, updatests);
    }

    // <--------settings is assessment allow to mobile--------->
    // IsMobileAllowed(opt) {
    //     const url = 'api/CustomAssessment/UpdateStatusForMobileAccess ';
    //     return this.post(url, opt);
    // }

    // <-------status update service end--------->
    // <--------assessment group by date start-------->
    getAssessmentGroupby(clientId) {
        //   alert(clientId);
        let today: any = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // January is 0
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        const monthName = this.getMonthname(today);
        // console.log(this.getMonthname(today));
        // today = mm + '/' + dd + '/' + yyyy;
        today = monthName + ' ' + dd + ' ' + yyyy;
        const jsongroup_url: string = 'api/PasientAssessmentsByUserId/AllAssessments?userId=' + clientId + '&CurrentDate=' + today;
        console.log(jsongroup_url);
        return this.get(jsongroup_url);
    }
// not getting from api
    ScheduleAssessment(Id) {
        const posts_Url: string = 'api/CustomAssessment/SurveysByProvider?ProviderId=' + Id;
        return this.get(posts_Url);
    }
    // <---- custom assessments------>
    // <----getting data from api file------>
    getAssessmentData(id, clientId) {
        const get_Url: string = 'api/CustomAssessment/GetAssessment?PersonId=' + clientId + '&PersonAssessmentId=' + id;
        return this.get(get_Url);
    }

    // <------posting data from api----->
    postCustomAssessment(opt) {
        const url = 'api/CustomAssessment/Save';
        return this.post(url, opt);
    }

    // <----for getting data individualchart from api------->
    getIndividualChartData(id, sid) {
        const performance_url: string = 'api/PatientAssessment/IndividualChart?patientAssessmentId=' + id + '&surveyID=' + sid;
        return this.get(performance_url);
    }

    // <----for getting data overallchart from api------->
    getOverallChartData(fromDate: string, toDate: string, clientId: number, sid: number) {
        const overall_url: string = 'api/PatientAssessment/AssessmentsWiseTotalScoreChart?PatientId=' + clientId +
            '&SurveyID=' + sid + '&FromDate=' + fromDate + '&ToDate=' + toDate + '';
        return this.get(overall_url);
    }
    // <----for getting data questionchart from api------->
    getQuestionChartData(fromDate: string, toDate: string, clientId: number, sid: number) {
        const overall_url: string = 'api/PatientAssessment/AllAssessmentsQuestionChart?PatientId=' + clientId +
            '&SurveyID=' + sid + '&FromDate=' + fromDate + '&ToDate=' + toDate + '';
        return this.get(overall_url);
    }

    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }
    // getCSVAssessmentData() {
    //     return this._httpjson.get('./assets/assessmentsCSV.json')
    //         .map((res: Response) => {
    //             return res.json();
    //         });
    // }
}