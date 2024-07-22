// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatButtonModule } from '@angular/material/button';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
// import { AppComponent } from '../../app.component';
// import { Task } from '../../../models/task.class';
// import {MatSelectModule} from '@angular/material/select';


// @Component({
//   selector: 'app-dialog-add-task',
//   standalone: true,
//   providers: [provideNativeDateAdapter()],
//   imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, AppComponent, FormsModule, MatProgressBarModule, MatDatepickerModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
//   templateUrl: './dialog-add-task.component.html',
//   styleUrl: './dialog-add-task.component.scss'
// })
// export class DialogAddTaskComponent implements OnInit{
//   taskid = '';
//   taskTitle = '';
//   task: Task = new Task();
//   endDate: Date | null = null;
//   loading = false;
//   firestore: Firestore = inject(Firestore);
//   employee = new FormControl('');
//   employeeList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
//   constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>) {}

//   ngOnInit(): void {

//   }
  
//   getUser() {
//     return collection(this.firestore, 'users');
//   } 

//   getTask() {
//     return collection(this.firestore, 'tasks');
//   } 

//   getSingleDoc(colId: string, docId: string) {
//       return doc(collection(this.firestore, colId), docId);
//   }

//   async saveTask() {
//     this.loading = true;
//     if (this.endDate) {
//       this.task.endDate = this.endDate.getTime();
//     }
//     const usersRef = collection(this.firestore, 'tasks');
//     await addDoc(usersRef, this.task.toJSON());
//     console.log('Task added', this.task);
//     this.loading = false;
//     this.dialogRef.close();
//   }
// }

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

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>) {}
  
  async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  async loadUsers() {
    const userCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(userCollection);
    this.employeeList = userSnapshot.docs.map(doc => {
      const userData = doc.data();
      return `${userData['firstName']} ${userData['lastName']}`;
    });
  }

  async saveTask() {
    this.loading = true;
    if (this.endDate) {
      this.task.endDate = this.endDate.getTime();
    }
    this.task.employee = this.employee.value?.join(', ') || '';
     // store selected employees as a comma-separated string
    const usersRef = collection(this.firestore, 'tasks');
    await addDoc(usersRef, this.task.toJSON());
    console.log('Task added', this.task);
    this.loading = false;
    this.dialogRef.close();
  }
}

