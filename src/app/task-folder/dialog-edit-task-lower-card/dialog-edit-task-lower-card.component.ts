import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../../app.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc, updateDoc, collection, getDocs } from '@angular/fire/firestore';
import { Task } from '../../../models/task.class';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-edit-task-lower-card',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatLabel,
    MatDialogModule,
    MatInputModule,
    AppComponent,
    FormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-edit-task-lower-card.component.html',
  styleUrls: ['./dialog-edit-task-lower-card.component.scss']
})
export class DialogEditTaskLowerCardComponent implements OnInit {
  task!: Task;
  loading = false;
  firestore: Firestore = inject(Firestore);
  employeeControl = new FormControl<string[]>([]);

  employeeList: string[] = [];
  statuses = [
    { value: '#FF5733', viewValue: 'Pre-Production' },
    { value: '#0abe00', viewValue: 'Scriptwriting' },
    { value: '#C70039', viewValue: 'Casting' },
    { value: '#900C3F', viewValue: 'Filming' },
    { value: '#581845', viewValue: 'Post-Production' }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogEditTaskLowerCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.task) {
      this.task = new Task(this.data.task);
      this.employeeControl.setValue(this.task.employee ? this.task.employee.split(', ') : []);
    }
    await this.loadEmployees();
  }

  async loadEmployees(): Promise<void> {
    const userCollection = collection(this.firestore, 'users');
    const userSnapshot = await getDocs(userCollection);
    this.employeeList = userSnapshot.docs.map(doc => {
      const userData = doc.data();
      return `${userData['firstName']} ${userData['lastName']}`;
    });
  }

  onStatusChange(statusValue: string): void {
    const selectedStatus = this.statuses.find(status => status.value === statusValue);
    if (selectedStatus) {
      this.task.statusText = selectedStatus.viewValue;
    }
  }

  async saveTask(): Promise<void> {
    this.loading = true;
    this.task.employee = this.employeeControl.value?.join(', ') || ''; 
    const taskDocRef = doc(this.firestore, `tasks/${this.task.id}`);
    await updateDoc(taskDocRef, this.task.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}

