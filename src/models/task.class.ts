// export class Task {
//     id?: string;
//     taskTitle: string;
//     userId: string;
//     customer: string;
//     firstName: string;
//     lastName: string;
//     eMail: string;
//     endDate: number | Date;
//     zipCode: number | null;
//     city: string;
//     employee: string;
   
//     constructor(obj?: any) {
//       this.id = obj ? obj.id : undefined;
//       this.taskTitle = obj ? obj.taskTitle : '';
//       this.userId = obj ? obj.userId : '';
//       this.customer = obj ? obj.customer : '';
//       this.firstName = obj ? obj.firstName : '';
//       this.lastName = obj ? obj.lastName : '';
//       this.eMail = obj ? obj.eMail : '';
//       this.endDate = obj ? obj.birthDate : 0;
//       this.zipCode = obj ? obj.zipCode : null;
//       this.city = obj ? obj.city : '';
//       this.employee = obj ? obj.employee : '';
//     }
  
//     public toJSON() {
//       const data: any = {
//         userId: this.userId,
//         taskTitle: this.taskTitle,
//         customer: this.customer,
//         firstName: this.firstName,
//         lastName: this.lastName,
//         eMail: this.eMail,
//         endDate: this.endDate instanceof Date ? this.endDate.getTime() : this.endDate,
//         zipCode: this.zipCode,
//         city: this.city,
//         employee: this.employee
//       };
  
//       // Konvertieren Sie `undefined` oder `null` in leere Strings
//       Object.keys(data).forEach(key => {
//         if (data[key] === undefined || data[key] === null) {
//           data[key] = "";
//         }
//       });
  
//       return data;
//     }
//   }
  
export class Task {
  id?: string;
  taskTitle: string;
  userId: string;
  customer: string;
  firstName: string;
  lastName: string;
  eMail: string;
  endDate: number | Date;
  zipCode: number | null;
  city: string;
  employee: string;
  status: string;
  statusText: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : undefined;
    this.taskTitle = obj ? obj.taskTitle : '';
    this.userId = obj ? obj.userId : '';
    this.customer = obj ? obj.customer : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.eMail = obj ? obj.eMail : '';
    this.endDate = obj ? obj.endDate : 0;
    this.zipCode = obj ? obj.zipCode : null;
    this.city = obj ? obj.city : '';
    this.employee = obj ? obj.employee : '';
    this.status = obj ? obj.status : '';
    this.statusText = obj ? obj.statusText : '';
  }

  public toJSON() {
    const data: any = {
      userId: this.userId,
      taskTitle: this.taskTitle,
      customer: this.customer,
      firstName: this.firstName,
      lastName: this.lastName,
      eMail: this.eMail,
      endDate: this.endDate instanceof Date ? this.endDate.getTime() : this.endDate,
      zipCode: this.zipCode,
      city: this.city,
      employee: this.employee,
      status: this.status,
      statusText: this.statusText
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

