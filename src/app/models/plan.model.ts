import { ActionPlanModel } from './actionplan.model';
export class PlanModel {
   Id: number;
   ClientId: number;
   FunctionalLimitations: string;
   OtherBarriersToEmployment: string;
   CommentsOtherBarries: string;
   Education: string;
   OtherTrainingsCertifications: string;
   CommentsOtherBarriersNotListed: string;
   JobTitlePreferences: string;
   Wage: string;
   PayType: string;
   BenefitsNeeded: string;
   PreferedArea: string;
   Transportation: string;
   ShortTermEmploymentGoal: string;
   LongTermEmploymentGoal: string;
   ShortTermSupportsNeeded: string;
   LongTermSupportsNeeded: string;
   AdditionalComments: string;
   Status: boolean;
   UserId: number;
   Date: string;
   ActionPlans: ActionPlanModel[];
   constructor() {
       this.Id = 0;
       this.ClientId = null;
       this.FunctionalLimitations = '';
       this.OtherBarriersToEmployment= '';
       this.CommentsOtherBarries = '';
       this.Education = '';
       this.OtherTrainingsCertifications = '';
       this.CommentsOtherBarriersNotListed = '';
       this.JobTitlePreferences = '';
       this.Wage = '';
       this.PayType = '';
       this.BenefitsNeeded =  '';
       this.PreferedArea = '';
       this.Transportation = '';
       this.ShortTermEmploymentGoal = '';
       this.LongTermEmploymentGoal = '';
       this.ShortTermSupportsNeeded = '';
       this.LongTermSupportsNeeded = '';
       this.AdditionalComments = '';
       this.Status = true;
       this.UserId = null;
       this.Date = null;
       this.ActionPlans = [];
   }
}