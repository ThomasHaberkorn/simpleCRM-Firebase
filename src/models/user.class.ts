export class User {
  id?: string;
  firstName: string;
  lastName: string;
  eMail: string;
  birthDate: number | Date;
  street: string;
  zipCode: number | null;
  city: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : undefined;
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.eMail = obj ? obj.eMail : '';
    this.birthDate = obj ? obj.birthDate : 0;
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : null;
    this.city = obj ? obj.city : '';
  }

  public toJSON() {
    const data: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      eMail: this.eMail,
      birthDate: this.birthDate instanceof Date ? this.birthDate.getTime() : this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city
    };

    // Konvertieren Sie `undefined` oder `null` in leere Strings
    Object.keys(data).forEach(key => {
      if (data[key] === undefined || data[key] === null) {
        data[key] = "";
      }
    });

    return data;
  }
}
