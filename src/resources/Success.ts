export class Success {
    public result: any;
    public status: number;
    constructor(result: any, status = 200) {
        this.result = result;
        this.status = status;
    }
}

export class SuccessCollection {
    public results: any[];
    public status: number;
    public count: number;
    constructor(results: any[], count: number, status = 200) {
        this.results = results;
        this.status = status;
        this.count = count;
    }
}
