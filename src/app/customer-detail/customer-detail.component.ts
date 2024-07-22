import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// import { UserComponent } from '../user/user.component';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
// import { User } from '../../models/user.class';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
// import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Customer } from '../../models/customer.class';
import { CustomerComponent } from '../customer/customer.component';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditCustomerAddressComponent } from '../dialog-edit-customer-address/dialog-edit-customer-address.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, CustomerComponent, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer = new Customer();
  customerId = '';
  customer$: Observable<Customer | undefined> = of(undefined);

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerId = params['id']; 
      this.getCustomer();
    });
  }

  getCustomer() {
    const customerDoc = doc(this.firestore, `customers/${this.customerId}`);
    this.customer$ = docData(customerDoc) as Observable<Customer | undefined>;
    this.customer$.subscribe(customer => {
      if (customer) {
        this.customer = customer;
      }
    });
    
  }

  editCustomerDetail() {
    this.customer.id = this.customerId;
    this.dialog.open(DialogEditCustomerComponent, {
      data: { customer: this.customer }
    });

  }

  editAddressDetail() {
    this.customer.id = this.customerId;
    this.dialog.open(DialogEditCustomerAddressComponent, {
      data: { customer: this.customer }
    });
  }

}
