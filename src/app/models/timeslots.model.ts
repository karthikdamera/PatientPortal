export class TimeSlots {
    profileId: number;
    dates: Array<DatesModel>;
    constructor() {
        this.profileId = 0;
        this.dates = [];
    }
}
export class DatesModel {
    dayname: string;
    date: string;
    Displaydate: string;
    slots: Array<SlotsModel>;
    constructor() {
        this.dayname = '';
        this.date = '';
        this.Displaydate = '';
        this.slots =  [];
    }
}
export class SlotsModel {
    Blocked: string;
    slotid: number;
    SlotStatus: string;
    fromtime: string;
    totime: string;
    duration: string;
    constructor() {
    this.Blocked = 'false';
    this.slotid = 0;
    this.SlotStatus = 'free';
    this.fromtime = '';
    this.totime = '';
    this.duration = '';
    }
}
