export class EducationModel {
   InstituteName: string;
   ProgrameTitle: string;
   Cast: number;
   DateApplied: string;
   Stage: string;
   Rate: number;
   Date: string;
   Status: boolean;
   UserId: number;
   ClientId: number;
   Id: number;
   constructor() {
       this.InstituteName = '';
       this.ProgrameTitle = '';
       this.Cast = null;
       this.DateApplied = '';
       this.Stage = 'Lead';
       this.Rate = 5;
       this.Date = '';
       this.Status = true;
       this.UserId = null;
       this.ClientId = null;
       this.Id = null;
   }
}