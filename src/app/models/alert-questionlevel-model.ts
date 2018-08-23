export class AlertQuestionLevelModel {
    Id: number;
    QuestionId: number;
    PatientAssessmentId: number;
    Type: string;
    Severity: string;
    Description: string;
    ClientId: number;
    ProviderId: number;
    AlertBy: string;
    AlertFrom: string;
    FilledByName: string;
    Status: boolean;
    Date: Date;
    constructor(Id: number, QuestionId: number, PatientAssessmentId: number, Type: string, Severity: string, Description: string, ClientId: number, ProviderId: number, AlertBy: string, AlertFrom: string, FilledByName: string, Status: boolean, Date: Date) {
        this.Id = Id;
        this.QuestionId = QuestionId;
        this.PatientAssessmentId = PatientAssessmentId;
        this.Type = Type;
        this.Severity = Severity;
        this.Description = Description;
        this.ClientId = ClientId;
        this.ProviderId = ProviderId;
        this.AlertBy = AlertBy;
        this.AlertFrom = AlertFrom;
        this.FilledByName = FilledByName;
        this.Status = Status;
        this.Date = Date;
    }

}