export class AppointmentModel {
    Id: number;
    AppointmentType: string;
    Duration: number;
    Instructions: string;
    IsActive: boolean;
    CreatedBy: number;
    CreatedOn: string;
    ModifiedBy: number;
    ModifiedOn: string;
    constructor() {
        this.Id = 0;
        this.AppointmentType = "";
        this.Duration = 0;
        this.Instructions = "";
        this.IsActive = true;
        this.CreatedBy = 0;
        this.CreatedOn = "";
        this.ModifiedBy = 0;
        this.ModifiedOn = "";

    }
}
export class EditAppointment {
    Id: number;
    AppointmentType: string;
    Duration: number;
    Instructions: string;
    IsActive: boolean;
    CreatedBy: number;
    CreatedOn: string;
    ModifiedBy: number;
    ModifiedOn: string;
}