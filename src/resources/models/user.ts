export class User {
    constructor(
        public pk: number,
        public userType: string,
        public userName: string,
        public email: string,
        public passWord: string,
        public archived: false,
        public postedUnits?: string[]
    ) { }
}
