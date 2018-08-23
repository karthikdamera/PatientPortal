export class PatientQuestionModel {
    QuestionId: number;
    AlertId: number;
    ChoiceId: number;
    PatientAssessmentId: number;
    UserId: any;
    TypeId: number;
    IsAlert: boolean;
    Answer: string;
    Date: string;
    FilledById: any;
    Score: number;
    SectionId: any;
    QuestionName: string;
    SectionName: string;
    IsParent: string;
    ChildQuestions: ChildQuestionModel[];
    constructor(QuestionId: number, AlertId: number, ChoiceId: number, PatientAssessmentId: number, UserId: any,
        TypeId: number, IsAlert: boolean, Answer: string, Date: string, FilledById: any, Score: any,
        SectionId: any,
        QuestionName: string,
        SectionName: string, IsParent: string, ChildQuestions: ChildQuestionModel[]
    ) {
        this.QuestionId = QuestionId;
        this.AlertId = AlertId;
        this.ChoiceId = ChoiceId;
        this.PatientAssessmentId = PatientAssessmentId;
        this.UserId = UserId;
        this.TypeId = TypeId;
        this.IsAlert = IsAlert;
        this.Answer = Answer;
        this.Date = Date;
        this.FilledById = FilledById;
        this.Score = Score;
        this.SectionId = SectionId;
        this.QuestionName = QuestionName;
        this.SectionName = SectionName;
        this.IsParent = IsParent;
        this.ChildQuestions = ChildQuestions;

   }
}
export class ChildQuestionModel {
    QuestionId: number;
    ChoiceId: number;
    TypeId: number;
    Answer: string;
    Score: number;
    QuestionName: string;
    constructor(QuestionId: number, ChoiceId: number, TypeId: number, Answer: string, Score: number, QuestionName: string) {
        this.QuestionId = QuestionId;
        this.ChoiceId = ChoiceId;
        this.TypeId = TypeId;
        this.Answer = Answer;
        this.Score = Score;
        this.QuestionName = QuestionName;
    }
}
