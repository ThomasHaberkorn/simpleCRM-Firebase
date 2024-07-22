import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
// import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
// import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Customer } from '../../models/customer.class';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  customer = new Customer();
  customers$: Observable<any[]> = new Observable();
  allCustomers: Customer[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'customers');
    this.customers$ = collectionData(usersCollection, { idField: 'id' });
    this.customers$.subscribe((changes: any[]) => {
      this.allCustomers = changes.map((customer: any) => new Customer({
        ...customer,
        birthDate: this.convertToDate(customer.birthDate)
      }));
    });
    
  }

  convertToDate(timestamp: any): Date {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date; // Rückgabe eines gültigen Datums oder eines Standardwertes
  }

  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }
}
