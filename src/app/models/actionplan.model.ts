export class ActionPlanModel {
   Id: number;
   ClientId: number;
   Name: string;
   ResponsiblePerson: string;
   Timeline: any;
   Outcome: string;
   Status: boolean;
   constructor() {
    this.Id = 0;
   this.ClientId = 0;
   this.Name = '';
   this.ResponsiblePerson ='';
   this.Timeline = null;
   this.Outcome = '';
   this.Status = true;
   }
}