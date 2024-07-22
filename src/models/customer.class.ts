export class Customer {
    id?: string;
    companyName: string;
    firstName: string;
    lastName: string;
    eMail: string;
    street: string;
    zipCode: number | null;
    city: string;
  
    constructor(obj?: any) {
      this.id = obj ? obj.id : undefined;
      this.companyName = obj ? obj.companyName : '';
      this.firstName = obj ? obj.firstName : '';
      this.lastName = obj ? obj.lastName : '';
      this.eMail = obj ? obj.eMail : '';
      this.street = obj ? obj.street : '';
      this.zipCode = obj ? obj.zipCode : null;
      this.city = obj ? obj.city : '';
    }
  
    public toJSON() {
      const data: any = {
        companyName: this.companyName,
        firstName: this.firstName,
        lastName: this.lastName,
        eMail: this.eMail,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city
      };
  
     
      return data;
    }
  }
  