import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { Customer } from '../../../models/customer.class';

@Component({
  selector: 'app-dialog-edit-customer',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormField, MatLabel, MatDialogModule, MatInputModule, AppComponent, FormsModule, MatProgressBar, MatDatepickerModule, MatButtonModule],
  templateUrl: './dialog-edit-customer.component.html',
  styleUrl: './dialog-edit-customer.component.scss'
})
export class DialogEditCustomerComponent implements OnInit{
  customerid = '';
  customer!: Customer;
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor(
    public dialogRef: MatDialogRef<DialogEditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.customer) {
      this.customer = new Customer(this.data.customer); 
    }
  }

  async saveCustomer() {
    this.loading = true;
    const customerDocRef = doc(this.firestore, `customers/${this.customer.id}`);
    await updateDoc(customerDocRef, this.customer.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}
