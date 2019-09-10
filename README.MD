units = [
    {
      pk: Primary Key,
      unitId: 'Generated when unit is posted', // string
      unitType: 'Dormitory or Apartment', // string
      location: 'City Name', // string
      numberOfRooms: 'Total Count (Number)', // number
      roomSize: 'sq.m' // string,
      unitTitle: 'For example: Apartment Unit 34sq.m 5 rooms with swimming pool inside (maximum characters of 100?)', // string
      unitDescription: 'Short Description about the unit up to 200 words (or characters?)', // string
      unitPhotos: ['Image File URLS (set on assets folder) up to 5 only?', 'Minimum of 1.'], // string
      priceOfRent: 'Total Price (Number)' // number
    }
]

users = [
    {
      pk: Primary Key,
      userType: 'User Must select if they are a property owner or normal user', // string
      userName: 'Unique user name for each users', // string
      email: 'Email address', // string
      passWord: 'Password of the user', // string
      archived: 'Boolean default false. To determine if account is active or not', // number
      postedUnits?: 'User/s will only have this parameter if they posted a unit/s' // number
    }
]

// this.sqlite.create({
//   name: DATABASE.MAINDB,
//   location: DATABASE.DBLOCATION
// }).then((db: SQLiteObject) => {
//   db.executeSql('select * from users', [])
//     .then((t) => console.log(t))
//     .catch(e => console.log(e));
// }).catch(e => console.log(e));