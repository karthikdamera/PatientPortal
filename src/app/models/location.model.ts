export class LocationModel {
    Id: number;
    LocationName: string;
    StateCode: any;
    IsActive: boolean;
    constructor() {
        this.Id = 0;
        this.LocationName = '';
        this.StateCode = '';
        this.IsActive = true;
    }
}
