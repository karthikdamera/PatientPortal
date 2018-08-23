export class PersonRequestsModel {
    Id: number;
    RequestTypeId: number;
    ProviderId: number;
    PersonId: number;
    Details: string;
    RequestedOn: string;
    PhoneNo: string;
    Email: string;
    IsActive: boolean;
    CreatedOn: string;
    CreatedBy: string;
    ModifiedOn: string;
    ModifiedBy: string;
    RefillPharmacyId: number;
    PharmacyName: string;
    RefillMedicationId: string;
    RecordSenderEmail: string;
    RecordSenderPhone: string;
    RecordSenderFAX: string;
    BillClaimNo: string;
    BillDateOfService: string;
    Medications: Array<Medications>;
    constructor() {
        this.PhoneNo = '';
    }
}
export enum RequestTypeIdEnum {
    medicineRefills = 1,
    testResults = 2,
    requestQuestion = 3,
    referFriend = 4,
    requestInformation = 5,
    requestRecords = 6,
    requestBilling = 7
}
export class Medications {
    MedicationId: number;
    Medication: string;
    PersonId: number;
 }