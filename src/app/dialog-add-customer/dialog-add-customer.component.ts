import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
// import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { Customer } from '../../models/customer.class';


@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, AppComponent, MatProgressBarModule, MatButtonModule],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss'
})
export class DialogAddCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>) {}

  ngOnInit(): void {

  }

  getCustomer() {
    return collection(this.firestore, 'customers');
  } 

  getSingleDoc(colId: string, docId: string) {
      return doc(collection(this.firestore, colId), docId);
  }

  async saveCustomer() {
    this.loading = true;
  
    const customersRef = collection(this.firestore, 'customers');
    await addDoc(customersRef, this.customer.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }

}
