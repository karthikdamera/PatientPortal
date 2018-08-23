export class ServiceTypeModel {
    Id: number;
    AppointmentType: string;
    Duration: number;
    Instructions: string;
    IsActive: boolean;
    constructor() {
        this.Id = 0;
        this.AppointmentType  = '';
        this.Duration = 0;
        this.Instructions  = '';
        this.IsActive = true;
    }
}
