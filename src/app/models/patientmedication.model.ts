
export class Medication_Model {
  Id: number;
  Name: string;
  Description: string;
  ResponsiblePerson: string;
  CreatedDate: Date;
  CreatedBy: number;
  UpdatedDate: Date;
  UpdatedBy: number;
  IsActive: boolean;
  constructor() {
    this.Id = 0;
    this.Name = '';
    this.Description = '';
    this.CreatedDate = null;
    this.CreatedBy = 0;
    this.UpdatedDate = null;
    this.UpdatedBy = 0;
    this.IsActive = true;
  }
}


export class ClientMedication {
  UserId: number;
  ClientId: number;
  Date: Date;
  Medications: any[];
  constructor() {
    this.UserId = 0;
    this.ClientId = 0;
    this.Date = null;
    this.Medications = [new MedicationsData(0, '', '', '', '', 'Active')];
  }
}



export class MedicationsData {
  Id: number;
  MedicationName: string;
  Description: string;
  Dosage: string;
  Frequency: string;
  Status: string;
  constructor(Id: number, MedicationName: string, Description: string, Dosage: string, Frequency: string, Status: string) {
    this.Id = Id;
    this.MedicationName = MedicationName;
    this.Description = Description;
    this.Dosage = Dosage;
    this.Frequency = Frequency;
    this.Status = Status;
  }
}