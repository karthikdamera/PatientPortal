export class ChildQuestionModel {
    QuestionId: number;
    ChoiceId: number;
    TypeId: number;
    Answer: string;
    Score: number;
    QuestionName: string;
    constructor(QuestionId: number,ChoiceId: number,TypeId: number,Answer: string, Score: number, QuestionName: string) {
        this.QuestionId = QuestionId;
        this.ChoiceId = ChoiceId;
        this.TypeId = TypeId;
        this.Answer = Answer;
        this.Score = Score;
        this.QuestionName = QuestionName;
    }
}