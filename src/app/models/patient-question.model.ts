import { ChildQuestionModel } from './child-question-model';

export class PatientQuestionModel {
  QuestionId: number;
  AlertId: number;
  ChoiceId: number;
  PatientAssessmentId: number;
  UserId: any;
  TypeId: number;
  IsAlert: boolean;
  Answer: string;
  Date: Date;
  FilledById: any;
  Score: number;
  SectionId: any;
  QuestionName: string;
  SectionName: string;
  IsParent: string;
  ChildQuestions: ChildQuestionModel[];
  constructor(QuestionId: number, AlertId: number, ChoiceId: number, PatientAssessmentId: number, UserId: any,
    TypeId: number, IsAlert: boolean, Answer: string, Date: Date, FilledById: any, Score: any,
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
