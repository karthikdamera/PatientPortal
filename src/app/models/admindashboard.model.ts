export class AdminDashboardModel {
    public openTitle: string;
    public openCount: number;
    public closedCount: number;
    public closedTitle: string;
    public navigateUrl: string;
    public openCountCssClass: string;
    constructor() {
        this.openTitle = '';
        this.openCount = 0;
        this.closedTitle = '';
        this.closedCount = 0;
        this.navigateUrl = '';
        this.openCountCssClass = '';
    }
}
