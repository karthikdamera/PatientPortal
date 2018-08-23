export class ChatModel {
    ToNumbers: string[];
    FromNumber: string;
    Body: string;
    constructor() {
        this.ToNumbers = [];
        this.FromNumber = '';
        this.Body = '';
    }
}
export class CreateGroup {
    Id: number;
    Name: string;
    Icon: string;
    Date: string;
    UserId: number;
    Numbers: Array<Numbers>;
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.Icon = '';
        this.Date = '';
        this.UserId = 0;
        this.Numbers = [];
    }
}
export class Numbers {
    Id: number;
    Name: string;
    Number: string;
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.Number = '';
    }
}
export class PushArrayData {
    Sid: string;
    ProviderName: string;
    PhoneNumber: number;
    providerId: string;
}
export class PostGroupInfo {
    Id: number;
    Name: string;
    Icon: string;
    Date: string;
    UserId: number;
    IsActive: boolean;
    Numbers: Array<object>;
    constructor() {
        this.Id = 0;
        this.Name = "";
        this.Icon = "";
        this.Date = "";
        this.UserId = 0;
        this.IsActive = true;
    }
}
