export class DesignationModel {
    Id: number;
    Name: string;
    CreatedOn: any;
    CreatedBy: any;
    ModifiedOn: any;
    ModifiedBy: any;
    IsActive: boolean;
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.CreatedOn = new Date();
        this.CreatedBy = 'Ravi';
        this.ModifiedOn = new Date();
        this.ModifiedBy = 'Ravi';
        this.IsActive = true;
    }
}

