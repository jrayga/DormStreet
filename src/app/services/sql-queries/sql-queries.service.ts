import { Injectable, OnInit } from '@angular/core';
import { TABLES } from '../../../resources/constants/TABLES';
import { Storage } from '@ionic/storage';
import { AlertService } from '../alert/alert.service';
import { User } from '../../../resources/models/user';
import { Router } from '@angular/router';
import { PAGES } from '../../../resources/constants/pages';
import * as alasql from 'alasql';
import { Unit } from '../../../resources/models/unit';

@Injectable({
  providedIn: 'root'
})
export class SqlQueriesService {
  users = [
    {
      pk: 1,
      userType: 'PropertyOwner',
      userName: 'Owner01',
      email: 'owner01@yopmail.com',
      passWord: '123123',
      archived: false,
      contactNumber: '09112233445',
      postedUnits: ['1', '1', '1', '1', '1']
    },
    {
      pk: 2,
      userType: 'NormalUser',
      userName: 'User01',
      email: 'user01@yopmail.com',
      passWord: '123123',
      contactNumber: '09224466889',
      archived: false
    }];

  units = [
    {
      pk: 1,
      unitId: '1',
      unitType: 'Apartment',
      location: 'City of Manila',
      numberOfRooms: 6,
      roomSize: '25sqm',
      unitTitle: 'Vista Heights Apartment',
      unitDescription: 'Near TIP, TUP, NTC, CEU. SAN BEDA 10-15 mins to FEU and UST',
      unitPhotos: ['../../assets/images/apart-1-1.png', '../../assets/images/apart-1-2.png', '../../assets/images/apart-1-3.png'],
      priceOfRent: 5500,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 2,
      unitId: '1',
      unitType: 'Dormitory',
      location: 'Caloocan',
      numberOfRooms: 5,
      roomSize: '10sqm',
      unitTitle: 'Female Bedspacer For Rent',
      unitDescription: 'Inclusions: Utility Bills (water and electricity) Pwede maglaba Pwede magluto Cabinet May wifi (+100).',
      unitPhotos: ['../../assets/images/dorm-1-1.png', '../../assets/images/dorm-1-2.png', '../../assets/images/dorm-1-3.png'],
      priceOfRent: 1500,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 3,
      unitId: '1',
      unitType: 'Apartment',
      location: 'Las Pinas',
      numberOfRooms: 6,
      roomSize: '20sqm',
      unitTitle: 'Bedspace Female',
      unitDescription: '1 Month Advance and 1 Month With Air condition, Kitchen, Lockers and Bathroom Water Included Electricity Excluded Contact: 0909090998',
      unitPhotos: ['../../assets/images/apart-2-1.png', '../../assets/images/apart-2-2.png', '../../assets/images/apart-2-3.png'],
      priceOfRent: 2200,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 4,
      unitId: '1',
      unitType: 'Apartment',
      location: 'Makati',
      numberOfRooms: 3,
      roomSize: '25sqm',
      unitTitle: 'Unit for Rent Near Pureza Station',
      unitDescription: 'Good for 2 to 3 person W/Appliances Loft Type W/2beds Amenities Lap Pool Social hall Gym Roof Deck 24hrs security CCTV hallway 2 months deposit 1 month advance',
      unitPhotos: ['../../assets/images/apart-3-1.png', '../../assets/images/apart-3-2.png', '../../assets/images/apart-3-3.png'],
      priceOfRent: 13000,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 5,
      unitId: '1',
      unitType: 'Dormitory',
      location: 'Malabon',
      numberOfRooms: 10,
      roomSize: '30sqm',
      unitTitle: 'Solo room/Bedspace/Condo Sharing',
      unitDescription: 'We accept Bedspacer. For Transient: Room w/ AC: 750/day per room Bedspace w/ AC: 350/day per head For Monthly: Room w/ AC: 15,000 per room Room w/ AC: 12,000 per room (open sept. 21 - oct. 27) Room w/o AC: 8,000 per room Bedspace w/ AC: 5,500 per head Inclusion: Water Electricity AC (6:00pm to 6:00am Only) Electric Fan ReF Bed and foam Mode of payment: 1month advance and 1month deposit PM for details.',
      unitPhotos: ['../../assets/images/dorm-2-1.png', '../../assets/images/dorm-2-2.png', '../../assets/images/dorm-2-3.png'],
      priceOfRent: 5500,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 6,
      unitId: '1',
      unitType: 'Apartment',
      location: 'Mandaluyong',
      numberOfRooms: 10,
      roomSize: '10sqm',
      unitTitle: 'MALE BEDSPACE/CONDO SHARING',
      unitDescription: 'P3,700/month Upper Deck Bedspace ALL-IN‼ P4,000/month Lower Deck Bedspace ALL-IN‼ INCLUSIONS: Electricity Water Unlimited WIFI DETAILS: Clean and Secured Quiet and Well Ventilated CCTV (24 Hours) Intercom Bed with Pillow 2 Toilet and 🛁 Bath (with bidet) FREE TO USE: 2 Air Conditioner 2 Electric Fan Brand New Bedsheet and Pillow Case With Privacy Curtain Drawer Shoe Rack Laundry Rack/Towel Rack Hot & Cold Water Dispenser Electric kettle Rice cooker Stove Kitchen Utensils Food Storage',
      unitPhotos: ['../../assets/images/apart-4-1.png', '../../assets/images/apart-4-2.png', '../../assets/images/apart-4-3.png'],
      priceOfRent: 4000,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 7,
      unitId: '1',
      unitType: 'Dormitory',
      location: 'Marikina',
      numberOfRooms: 15,
      roomSize: '30sqm',
      unitTitle: 'Budget Bedspace Room',
      unitDescription: 'Accept LADY BEDSPACERS for reviewees only. Accommodate max of 5 to 6 reviewees. Includes ELECTRICITY and WATER With Uratex mattresses With chairs and tables Well-lighted study area, Spacious and well ventilated room. With book shelves, and individual lockers and closets. PHP 2,800 Deposit and PHP 2,800 Advance payments required. (ONE MONTH ADVANCE ONE MONTH DEPOSIT) ALL IN.. Free WIFI Access ELECTRICITY WATER FREE USe oF Rice Cooker FREE USE OF REFRIGERATOR RESERVATION 1K BAWAS kapag nag move in For inquiries. Call me 09165227760 or text Nanay Fatima 09396320204 or PM me.',
      unitPhotos: ['../../assets/images/dorm-3-1.png', '../../assets/images/dorm-3-2.png', '../../assets/images/dorm-3-3.png'],
      priceOfRent: 2800,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 8,
      unitId: '1',
      unitType: 'Apartment',
      location: 'Muntinlupa',
      numberOfRooms: 6,
      roomSize: '10sqm',
      unitTitle: 'Female Renters Only',
      unitDescription: 'HOW MUCH: 4k per head/month WHAT ARE THE INCLUSIONS: Inclusive of association dues. With 2 Double Deck with foam Mini Refrigerator Own CR HOW LONG IS THE DURATION: Only for 6 months (Until March) TERMS OF PAYMENT: 1 month advance, 2 months deposit HOW ABOUT THE BILLS: The total bill for the Electricity & Water will be divided equally by the tenants HOW BIG IS THE UNIT: It’s a studio type unit MOVE IN DATE: ASAP PLEASE PM ME FOR MORE INFORMATION & DETAILS',
      unitPhotos: ['../../assets/images/apart-5-1.png', '../../assets/images/apart-5-2.png', '../../assets/images/apart-5-3.png'],
      priceOfRent: 4000,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 9,
      unitId: '1',
      unitType: 'Apartment',
      location: 'Parañaque',
      numberOfRooms: 2,
      roomSize: '10sqm',
      unitTitle: 'RSG Aguila Residents Units',
      unitDescription: 'RSG Aguila Residents Units For rent 2br loft and t&b, sink Electricity and Water Meters Furnished with appliances Rate 18,000 per month 1 bedloft 15,000 per month Call 0929 244 8380 0927 841 2949',
      unitPhotos: ['../../assets/images/apart-6-1.png', '../../assets/images/apart-6-2.png', '../../assets/images/apart-6-3.png'],
      priceOfRent: 18000,
      totalOccupancy: 0,
      archived: false
    },
    {
      pk: 10,
      unitId: '1',
      unitType: 'Dormitory',
      location: 'Parañaque',
      numberOfRooms: 2,
      roomSize: '20sqm',
      unitTitle: '2 Bunk Beds With Mattresses',
      unitDescription: '2 cabinets with built-in table for study purposes (bring your own lock) Aircon Chairs Fire extinguisher Induction cooker Kitchen sink Shoe rack Smoke alarm Stand fan Wardrobe cabinet Unit is wifi & TV cable-ready. (Pwede din naman kayo maki-connect sa amin kung di naman malakas gumamit.) 1 month advance, 1 month deposit Water & electricity (Meralco load) is excluded PM me if you want to check the unit.',
      unitPhotos: ['../../assets/images/dorm-4-1.png', '../../assets/images/dorm-4-2.png', '../../assets/images/dorm-4-3.png'],
      priceOfRent: 8000,
      totalOccupancy: 0,
      archived: false
    }
  ]

  userDetails: User
  getUnits: Unit[]

  constructor(
    private storage: Storage,
    private alertService: AlertService,
    private router: Router
  ) { }

  getAllUnits(price?: string, location?: string, unitType?: string, numberOfRooms?: number) {
    return this.storage.get(TABLES.units).then(async units => {
      const unitsIn = await JSON.parse(units);
      console.log("TCL: SqlQueriesService -> getAllUnits -> unitsIn", unitsIn)
      let getUnits;
      if (price != undefined || location != undefined || unitType != undefined || numberOfRooms != undefined) {
        let unitTypeSql = '', locationSql = '', numberOfRoomsSql = '', priceSql = '';
        if (unitType !== '') {
          unitTypeSql = `AND unitType = '${unitType}' `;
        }
        if (location !== '') {
          locationSql = `AND location = '${location}' `;
        }
        if (numberOfRooms > 0) {
          if (numberOfRooms == 1) {
            numberOfRoomsSql = 'AND numberOfRooms BETWEEN 1 AND 5';
          } else if (numberOfRooms == 5) {
            numberOfRoomsSql = 'AND numberOfRooms BETWEEN 5 AND 10';
          } else if (numberOfRooms == 10) {
            numberOfRoomsSql = 'AND numberOfRooms > 10';
          }
        }
        if (price !== '') {
          priceSql = `ORDER BY priceOfRent ${price} `;
        }
        console.log("TCL: SqlQueriesService -> getAllUnits -> numberOfRoomsSql", numberOfRoomsSql)
        getUnits = await alasql(`SELECT * from ? WHERE archived = false ${unitTypeSql} ${locationSql} ${numberOfRoomsSql} ${priceSql}`, [unitsIn]);
      } else {
        getUnits = await alasql('SELECT * from ? ORDER BY unitTitle asc', [unitsIn]);
      }
      return await getUnits;
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> getAllUnits -> error", error)
      this.alertService.presentErrorAlert('while getting units.')
    })
  }

  getUnit(pk: string) {
    return this.storage.get(TABLES.units).then(async units => {
      const unitsIn = await JSON.parse(units);
      console.log("TCL: SqlQueriesService -> getUnit -> unitsIn", unitsIn)
      const getUnit = await alasql(`SELECT * from ? WHERE pk = ${pk}`, [unitsIn]);
      return await getUnit;
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> getUnit -> error", error)
      this.alertService.presentErrorAlert('while getting unit details.')
    })
  }

  getUser() {
    return this.storage.get(TABLES.session).then(async userSession => {
      const session = await userSession;
      const users = await this.storage.get(TABLES.users)
      const usersParsed = JSON.parse(users);
      for (const i in usersParsed) {
        if (usersParsed[i].userName == session) {
          return await usersParsed[i];
        }
      }
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> getUser -> error", error)
      this.alertService.presentErrorAlert('while getting user details.')
    })
  }

  async setUserAccounts() {
    this.storage.get(TABLES.users).then(async user => {
      if (user == null) {
        await this.storage.set(TABLES.users, JSON.stringify(this.users));
      }
    }).catch(error => {
      console.log("TCL: AppComponent -> setUserAccounts -> error", error)
      this.alertService.presentErrorAlert('while adding storage users.')
    })
  }

  async setUnits() {
    this.storage.get(TABLES.units).then(async user => {
      if (user == null) {
        await this.storage.set(TABLES.units, JSON.stringify(this.units));
      }
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> setUnits -> error", error)
      this.alertService.presentErrorAlert('while adding storage units.')
    })
  }

  async addNewUser(userDetails) {
    this.storage.get(TABLES.users).then(async user => {
      let users = await JSON.parse(user)
      await users.push(userDetails)
      try {
        const addUser = await this.storage.set(TABLES.users, JSON.stringify(users));
        this.alertService.presentSuccessAlert('You are now successfully registered!')
        await this.router.navigate([PAGES.LOGIN]);
      } catch (error) {
        console.log("TCL: SqlQueriesService -> addNewUser -> error", error)
        this.alertService.presentErrorAlert('While registering your account.')
      }
    }).catch(error => {
      console.log("TCL: AppComponent -> setUserAccounts -> error", error)
      this.alertService.presentErrorAlert('while adding storage users.')
    })
  }

  async updatePassword(userDetails) {
    return this.storage.get(TABLES.users).then(async users => {
      const usersIn = await JSON.parse(users);
      let passUpdated = false;
      for (const u in usersIn) {
        if (userDetails.pk == usersIn[u].pk) {
          usersIn[u].passWord = userDetails.passWord
          passUpdated = true;
          break;
        }
      }
      const updateUsers = await this.storage.set(TABLES.users, JSON.stringify(usersIn))
      return passUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while updating password.')
    })
  }

  async updateDetails(userDetails) {
    return this.storage.get(TABLES.users).then(async users => {
      const usersIn = await JSON.parse(users);
      let detailsUpdated = false;
      for (const u in usersIn) {
        if (userDetails.pk == usersIn[u].pk) {
          usersIn[u].userName = await usersIn[u].userName;
          usersIn[u].email = await userDetails.email
          usersIn[u].contactNumber = await userDetails.contactNumber;
          detailsUpdated = true;
          break;
        }
      }
      const updateUsers = await this.storage.set(TABLES.users, JSON.stringify(usersIn))
      return detailsUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while updating password.')
    })
  }

  login(userName: string, passWord: string) {
    return this.storage.get(TABLES.users).then(async user => {
      const users = await JSON.parse(user);
      let userExist = false
      for (const u in users) {
        if (userName == users[u].userName && passWord == users[u].passWord) {
          userExist = true
          break;
        }
      }
      return userExist;
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> login -> error", error)
      this.alertService.presentErrorAlert('while logging in.')
    })
  }

  getUserUnits(unitIds: string[]) {
    return this.storage.get(TABLES.units).then(async units => {
      const unitsIn = await JSON.parse(units);
      const userUnits = await alasql(`SELECT * FROM ? WHERE unitId = '${unitIds[0]}'`, [unitsIn])
      console.log("TCL: SqlQueriesService -> getUserUnits -> userUnits", userUnits)
      return await userUnits;
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> getUserUnits -> error", error)
      this.alertService.presentErrorAlert('while getting user units.')
    })
  }

  async logout() {
    await this.storage.remove(TABLES.session)
  }

  addNewUnit(unitDetails) {
    this.storage.get(TABLES.units).then(async units => {
      let unitsIn = await JSON.parse(units)
      await unitsIn.push(unitDetails)
      try {
        const addUnit = await this.storage.set(TABLES.units, JSON.stringify(unitsIn));
        this.alertService.presentSuccessAlert("You're unit has been successfully added.")
        await this.router.navigate([PAGES.MYPROPERTIES]);
      } catch (error) {
        console.log("TCL: SqlQueriesService -> addNewUnit -> error", error)
        this.alertService.presentErrorAlert('While adding your unit.')
      }
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> addNewUnit -> error", error)
      this.alertService.presentErrorAlert('while adding your unit.')
    })
  }

  async updateUnitDetails(userDetails) {
    return this.storage.get(TABLES.units).then(async units => {
      const unitsIn = await JSON.parse(units);
      let detailsUpdated = false;
      for (const u in unitsIn) {
        if (userDetails.pk == unitsIn[u].pk) {
          unitsIn[u].unitId = await userDetails.unitId;
          unitsIn[u].unitType = await userDetails.unitType;
          unitsIn[u].location = await userDetails.location;
          unitsIn[u].numberOfRooms = await userDetails.numberOfRooms;
          unitsIn[u].roomSize = await userDetails.roomSize;
          unitsIn[u].unitTitle = await userDetails.unitTitle;
          unitsIn[u].unitDescription = await userDetails.unitDescription;
          unitsIn[u].unitPhotos = await userDetails.unitPhotos;
          unitsIn[u].priceOfRent = await userDetails.priceOfRent;
          unitsIn[u].totalOccupancy = await userDetails.totalOccupancy;
          unitsIn[u].archived = await userDetails.archived;
          detailsUpdated = true;
          break;
        }
      }
      await this.storage.set(TABLES.units, JSON.stringify(unitsIn))
      return detailsUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> updateUnit -> error", error)
      this.alertService.presentErrorAlert('while updating unit details.')
    })
  }

  async deleteUnitPosting(unitPK: string) {
    return this.storage.get(TABLES.units).then(async units => {
      const unitsIn = await JSON.parse(units);
      let newUnits = [];
      let detailsUpdated = false;
      for (const u in unitsIn) {
        if (unitPK !== unitsIn[u].pk) {
          newUnits.push(unitsIn[u])
          detailsUpdated = true;
        }
      }
      await this.storage.set(TABLES.units, JSON.stringify(newUnits))
      return detailsUpdated
    }).catch(error => {
      console.log("TCL: SqlQueriesService -> updateUnit -> error", error)
      this.alertService.presentErrorAlert('while deleting the unit.')
    })
  }

}
