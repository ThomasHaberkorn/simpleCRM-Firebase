import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { AppComponent } from '../../app.component';
import { Task } from '../../../models/task.class';
import { MatSelectModule } from '@angular/material/select';
// import { Customer } from '../../../models/customer.class';

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, AppComponent, FormsModule, MatProgressBarModule, MatDatepickerModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {
  taskid = '';
  taskTitle = '';
  task: Task = new Task();
  endDate: Date | null = null;
  loading = false;
  firestore: Firestore = inject(Firestore);
  employee = new FormControl([]);
  employeeList: string[] = [];
  customer = new FormControl('');
  customerList: string[] = [];

  statuses = [
    { value: '#FF5733', viewValue: 'Pre-Production' },
    { value: '#0abe00', viewValue: 'Scriptwriting' },
    { value: '#C70039', viewValue: 'Casting' },
    { value: '#900C3F', viewValue: 'Filming' },
    { value: '#581845', viewValue: 'Post-Production' }
  ];

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>) {}
  
  async ngOnInit(): Promise<void> {
    await this.loadUsers();
    await this.loadCustomers();
  }

  async loadUsers(): Promise<void> {
    const userCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(userCollection);
    this.employeeList = userSnapshot.docs.map(doc => {
      const userData = doc.data();
      return `${userData['firstName']} ${userData['lastName']}`;
    });
  }

  async loadCustomers(): Promise<void> {
    const customerCollection = collection(this.firestore, 'customers');
    const customerSnapshot = await getDocs(customerCollection);
    this.customerList = customerSnapshot.docs.map(doc => {
      const customerData = doc.data();
      return `${customerData['companyName']}`;
    });
  }

  onStatusChange(statusValue: string): void {
    const selectedStatus = this.statuses.find(status => status.value === statusValue);
    if (selectedStatus) {
      this.task.status = selectedStatus.value;
      this.task.statusText = selectedStatus.viewValue;
    }
  }

  async saveTask(): Promise<void> {
    this.loading = true;
    if (this.endDate) {
      this.task.endDate = this.endDate.getTime();
    }
    this.task.employee = this.employee.value?.join(', ') || ''; 
    this.task.customer = this.customer.value || ''; 
    const usersRef = collection(this.firestore, 'tasks');
    await addDoc(usersRef, this.task.toJSON());
    console.log('Task added', this.task);
    this.loading = false;
    this.dialogRef.close();
  }

}
