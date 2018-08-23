 export class SaveClientInterventions {
    UserId: number;
    ClientId: number;
    Date: any;
    Interventions: Array<Interventions>;
 }
 export class Interventions {
     InterventionId: number;
     InterventionName: string;
     OccurrenceId: number;
     Occurrence: string ;
     FrequencyId: number ;
     Frequency: string ;
     Type: string ;
     Status: string ;
     Symptoms: Array<Symptoms>;
     constructor() {
        this.InterventionId = 0;
        this.InterventionName = '';
        this.OccurrenceId = 0;
        this.Occurrence = '';
        this.FrequencyId = 0;
        this.Frequency = '';
        this.Type  = '';
        this.Status  = '';
        this.Symptoms = [];
    }
}
export class Symptoms {
    SymptomId: number;
    SymptomName: string;
    Type: string;
     checked: boolean;
    constructor() {
        this.SymptomId = 0;
        this.SymptomName = '';
        this.Type = '';
         this.checked = false;
    }
 }
 export class Update {
    PatientInterventionId: number;
    Status: string;
    Date: any;
    constructor() {
        this.PatientInterventionId = 0;
        this.Status = '';
        this.Date = '';
        // this.checked = false;
    }
 }