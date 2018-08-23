import { PersonBaseService } from './../../person/personBaseService';
import { Api } from './../../../../environments/environment.prod';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';
@Injectable()
export class AssessmentService  extends PersonBaseService {
    constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *   // to get assessments
     * @param id
     */
    GetAssessments(id, sid) {
        const url = 'api/Questionary/GetQuestions?PersonId=' + id + '&PersonQuestionaryId=' + sid;
        return this.get(url);
    }
    /**
     * assessment post
     * @param data
     */
    assessmentPost(data) {
        const url = 'api/Questionary/Save';
        return this.post(url, data);
    }

}



