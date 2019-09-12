export class Unit {
    constructor(
        public pk: number,
        public unitId: string,
        public unitType: string,
        public location: string,
        public numberOfRooms: number,
        public roomSize: string,
        public unitTitle: string,
        public unitDescription: string,
        public unitPhotos: string[],
        public priceOfRent: number,
        public totalOccupancy: number
    ) { }
}
