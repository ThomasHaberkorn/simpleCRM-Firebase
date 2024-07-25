import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    MatCard
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;

  task = new Task();
  tasks$: Observable<any[]> = new Observable();
  allTasks: Task[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const taskCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(taskCollection, { idField: 'id' });
    this.tasks$.subscribe((changes: any[]) => {
      this.allTasks = changes.map((task: any) => new Task(task));
      this.updateChartData();
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const dataset = context.dataset;
              const index = context.dataIndex;
              const label = dataset.labels ? dataset.labels[index] : '';
              const value = dataset.data[index];
              const titles = dataset.taskTitles ? dataset.taskTitles[index].join(', ') : 'No tasks';
              return `${label}: ${value} (${titles})`;
            }
          }
        }
      }
    };
  }

  updateChartData(): void {
    const customerTaskCounts: { [key: string]: number } = {};
    const customerTaskTitles: { [key: string]: string[] } = {};

    // Zählen Sie die Anzahl der Tasks und erfassen Sie die Task-Titel für jeden Kunden
    this.allTasks.forEach(task => {
      if (!customerTaskCounts[task.customer]) {
        customerTaskCounts[task.customer] = 0;
        customerTaskTitles[task.customer] = [];
      }
      customerTaskCounts[task.customer]++;
      customerTaskTitles[task.customer].push(task.taskTitle); // Hier wird der Titel des Tasks hinzugefügt
    });


    const labels = Object.keys(customerTaskCounts);
    const dataValues = labels.map(label => customerTaskCounts[label]);
    const taskTitles = labels.map(label => customerTaskTitles[label]); 

    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-600'), 
            documentStyle.getPropertyValue('--yellow-500'), 
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--teal-500'),
            documentStyle.getPropertyValue('--purple-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),  
            documentStyle.getPropertyValue('--yellow-400'), 
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--orange-400'),
            documentStyle.getPropertyValue('--teal-400'),
            documentStyle.getPropertyValue('--purple-400')
          ],
          taskTitles: taskTitles // Hier werden die Task-Titel hinzugefügt
        }
      ]
    };
  }
}
