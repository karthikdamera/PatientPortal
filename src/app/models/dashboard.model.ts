export class Dashboard {
    public TotalUsers: number;
    public AppointmentCount: number;
    public CheckinCount: number;
    public CheckoutCount: number;
    public CancelledCount: number;
    public NoShowApptCount: number;
    public NoOfRequests: number;
    public NoOfApprovedRequests: number;
    public NoOfDeclinedRequests: number;
    public NoOfPendingRequests: number;
    public TotalNoOfPatients: number;
    public LateChekinsCount: number;
    constructor() {
        this.TotalUsers = 0;
        this.AppointmentCount = 0;
        this.CheckinCount = 0;
        this.CheckoutCount = 0;
        this.CancelledCount = 0;
        this.NoShowApptCount = 0;
        this.NoOfRequests = 0;
        this.NoOfApprovedRequests = 0;
        this.NoOfDeclinedRequests = 0;
        this.NoOfPendingRequests = 0;
        this.TotalNoOfPatients = 0;
        this.LateChekinsCount = 0;
    }
}
