import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Customer } from '../../../models/customer.class';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-customer-preview',
  standalone: true,
  imports: [CommonModule, MatCard, RouterModule],
  templateUrl: './customer-preview.component.html',
  styleUrl: './customer-preview.component.scss'
})
export class CustomerPreviewComponent {
  
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
}
