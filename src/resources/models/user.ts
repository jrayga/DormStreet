export class User {
    constructor(
        public pk: number,
        public userType: string,
        public userName: string,
        public email: string,
        public passWord: string,
        public archived: false,
        public contactNumber: string,
        public postedUnits?: string[]
    ) { }
}
