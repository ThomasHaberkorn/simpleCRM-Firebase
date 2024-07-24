import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Task } from '../../../models/task.class';
import { Observable } from 'rxjs/internal/Observable';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatCard, MatIconModule, MatTooltipModule, RouterModule, MatCardTitle, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  task = new Task();
  tasks$: Observable<any[]> = new Observable();
  allTasks: Task[] = []

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const taskCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(taskCollection, { idField: 'id' });
    this.tasks$.subscribe((changes: any[]) => {
      this.allTasks = changes.map((task: any) => new Task({
        ...task,
        endDate: this.convertToDate(task.endDate)
      }));
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
        return '#DAA520'; // GoldenRod
      case 'MGM Metro-Goldwyn-Mayer':
        return '#8A2BE2'; // BlueViolet
      default:
        return '#FFFFFF'; // White
    }
  }

  convertToDate(timestamp: any): Date {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date; // Rückgabe eines gültigen Datums oder eines Standardwertes
  }

  openDialog() {
    this.dialog.open(DialogAddTaskComponent);
  }

}
