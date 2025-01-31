import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Task } from '../../../models/task.class';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
import { MatMenuModule} from '@angular/material/menu';
import { DialogEditTaskLowerCardComponent } from '../dialog-edit-task-lower-card/dialog-edit-task-lower-card.component';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, CommonModule, RouterModule, MatMenuModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  task: Task = new Task();
  taskId = '';
  task$: Observable<Task | undefined> = of(undefined);
  allTasks: Task[] = []

  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
       this.route.params.subscribe(params => {
      this.taskId = params['id']; 
      this.getTask();
    });
   
  }

  getTask() {
    const taskDoc = doc(this.firestore, `tasks/${this.taskId}`);
    this.task$ = docData(taskDoc) as Observable<Task | undefined>;
    this.task$.subscribe(task => {
      
      if (task) {
        this.task = task;
      }
    });
  }

  getBackgroundColor(customer: string): string {
    switch (customer) {
      case 'Walt Disney Company':
        return '#FFD700'; // Gold
      case 'Paramount Pictures':
        return '#1E90FF'; // DodgerBlue
      case 'Universal Pictures':
        return '#32CD32'; // LimeGreen
      case 'Warner Bros. Entertainment':
        return '#FF4500'; // OrangeRed
      case '20th Century Studios':
        return '#14b8a6'; // Teal
      case 'MGM Metro-Goldwyn-Mayer':
        return '#8A2BE2'; // BlueViolet
      default:
        return '#FFFFFF'; // White
    }
  }

  editTaskDetail() {
    this.task.id = this.taskId;
    this.dialog.open(DialogEditTaskComponent, {
      data: { task: this.task }
    });
  }

  editDetailLowerCard() {
    this.task.id = this.taskId;
    this.dialog.open(DialogEditTaskLowerCardComponent, {
      data: { task: this.task }
    });
  }
}
