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
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dialog-edit-task',
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
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {
  task!: Task;
  loading = false;
  firestore: Firestore = inject(Firestore);
  customer = new FormControl('');
  customerList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService
  ) {}
 async ngOnInit(): Promise<void> {
    if (this.data && this.data.task) {
      this.task = new Task(this.data.task); 
    }
    await this.loadCustomers();
  }
 

  async loadCustomers(): Promise<void> {
    const customerCollection = collection(this.firestore, 'customers');
    const customerSnapshot = await getDocs(customerCollection);
    this.customerList = customerSnapshot.docs.map(doc => {
      const customerData = doc.data();
      return `${customerData['companyName']}`;
    });
  }

  async saveTask(): Promise<void> {
    this.loading = true;
  
    const taskDocRef = doc(this.firestore, `tasks/${this.task.id}`);
    await updateDoc(taskDocRef, this.task.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }

  async deleteTask(): Promise<void> {
    this.loading = true;
    await this.taskService.deleteTask(this.task); // Use the service to delete the task
    this.loading = false;
    this.dialogRef.close();
  }
}
