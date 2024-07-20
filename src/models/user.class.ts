// export class User {
//     firstName: string;
//     lastName: string;
//     eMail: string;
//     birthDate: number | Date;
//     street: string;
//     zipCode: number;
//     city: string;

//     constructor(obj?: any) {
      
//         this.firstName = obj ? obj.firstName : '';
//         this.lastName = obj ? obj.lastName : '';
//         this.eMail = obj ? obj.eMail : '';
//         this.birthDate = obj ? obj.birthDate : '';
//         this.street = obj ? obj.street : '';
//         this.zipCode = obj ? obj.zipCode : '';
//         this.city = obj ? obj.city :'';
//     }

//     public toJSON() {
//         return {
//             firstName: this.firstName,
//             lastName: this.lastName,
//             eMail: this.eMail,
//             birthDate: this.birthDate,
//             street: this.street,
//             zipCode: this.zipCode,
//             city: this.city
//         }
//     }
// }

export class User {
    id?: string;
    firstName: string;
    lastName: string;
    eMail: string;
    birthDate: number | Date;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.eMail = obj ? obj.eMail : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : null;
        this.city = obj ? obj.city :'';
    }

    public toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            eMail: this.eMail,
            birthDate: this.birthDate instanceof Date ? this.birthDate.getTime() : this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        }
    }
}
