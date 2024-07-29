import { Injectable } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { Customer } from '../../models/customer.class';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: Firestore) {}

  async deleteCustomer(customer: Customer): Promise<void> {
    try {
      const customerDocRef = doc(this.firestore, `customers/${customer.id}`);
      await deleteDoc(customerDocRef);
      console.log('Customer successfully deleted!');
    } catch (error) {
      console.error('Error deleting customer: ', error);
    }
  }
}
