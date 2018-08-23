
export class PatientQuestionnaireModel {
  QuestionId: any;
  ChoiceId: any;
  PatientAssessmentId: any;
  UserId: any;
  TypeId: any;
  Answer: string;
  Date: Date;
  FilledById: any;
  Score: any;
  SectionId: any;
  QuestionName: string;
  SectionName: string;

  constructor(QuestionId: any, ChoiceId: any, PatientAssessmentId: any, UserId: any,
    TypeId: any, Answer: string, Date: Date, FilledById: any, Score: any,
    SectionId: any,
    QuestionName: string,
    SectionName: string
  ) {
    this.QuestionId = QuestionId;
    this.ChoiceId = ChoiceId;
    this.PatientAssessmentId = PatientAssessmentId;
    this.UserId = UserId;
    this.TypeId = TypeId;
    this.Answer = Answer;
    this.Date = Date;
    this.FilledById = FilledById;
    this.Score = Score;
    this.SectionId = SectionId;
    this.QuestionName = QuestionName;
    this.SectionName = SectionName;

  }
}
