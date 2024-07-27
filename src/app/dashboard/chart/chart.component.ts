// import { Component, OnInit } from '@angular/core';
// import { ChartModule } from 'primeng/chart';
// import { Observable } from 'rxjs';
// import { collectionData, collection, Firestore } from '@angular/fire/firestore';
// import { MatDialog } from '@angular/material/dialog';
// import { Task } from '../../../models/task.class';
// import { User } from '../../../models/user.class';

// @Component({
//   selector: 'app-chart',
//   standalone: true,
//   imports: [ChartModule],
//   templateUrl: './chart.component.html',
//   styleUrl: './chart.component.scss'
// })
// export class ChartComponent implements OnInit {

//   data: any;
//   options: any;

//   user = new User();
//   users$: Observable<any[]> = new Observable();
//   allUsers: User[] = [];

//   task = new Task();
//   tasks$: Observable<any[]> = new Observable();
//   allTasks: Task[] = [];

//   constructor(public dialog: MatDialog, private firestore: Firestore) { }

//   ngOnInit() {

//     const usersCollection = collection(this.firestore, 'users');
//     this.users$ = collectionData(usersCollection, { idField: 'id' });
//     this.users$.subscribe((changes: any[]) => {
//       this.allUsers = changes.map((user: any) => new User({
//         ...user,
//         birthDate: this.convertToDate(user.birthDate)
//       }));
//     });

//     const taskCollection = collection(this.firestore, 'tasks');
//     this.tasks$ = collectionData(taskCollection, { idField: 'id' });
//     this.tasks$.subscribe((changes: any[]) => {
//       this.allTasks = changes.map((task: any) => new Task(task));
//       this.updateChartData();
//     });

//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');
//     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

//     this.options = {
//       indexAxis: 'y',
//       maintainAspectRatio: false,
//       aspectRatio: 0.8,
//       plugins: {
//         legend: {
//           labels: {
//             color: textColor
//           }
//         }
//       },
//       scales: {
//         x: {
//           ticks: {
//             color: textColorSecondary,
//             font: {
//               weight: 500
//             }
//           },
//           grid: {
//             color: surfaceBorder,
//             drawBorder: false
//           }
//         },
//         y: {
//           ticks: {
//             color: textColorSecondary
//           },
//           grid: {
//             color: surfaceBorder,
//             drawBorder: false
//           }
//         }
//       }
//     };
//   }

//   updateChartData() {
//     const employeeTaskCount: { [key: string]: number } = {};

//     // Count tasks for each employee
//     this.allTasks.forEach(task => {
//       console.log('task.employee1', task.employee);
//       if (task.employee && typeof task.employee === 'string') {  // Check if task.employee is a string
//         console.log('task.employee', task.employee);
//         const employees = task.employee.split(',').map(employee => employee.trim()); // Split and trim the employee names
//         employees.forEach(employee => {
//           if (!employeeTaskCount[employee]) {
//             employeeTaskCount[employee] = 0;
//           }
//           employeeTaskCount[employee]++;
//         });
//       }
//     });

//     const labels = Object.keys(employeeTaskCount);
//     const data = Object.values(employeeTaskCount);

//     this.data = {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Tasks per Employee',
//           backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-300'),
//           borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-700'),
//           data: data
//         }
//       ]
//     };
//   }

//   convertToDate(timestamp: any): Date {
//     const date = new Date(timestamp);
//     return isNaN(date.getTime()) ? new Date() : date; // Rückgabe eines gültigen Datums oder eines Standardwertes
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';
import { collectionData, collection, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../../models/task.class';
import { User } from '../../../models/user.class';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  data: any;
  options: any;

  user = new User();
  users$: Observable<any[]> = new Observable();
  allUsers: User[] = [];

  task = new Task();
  tasks$: Observable<any[]> = new Observable();
  allTasks: Task[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit() {

    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });
    this.users$.subscribe((changes: any[]) => {
      this.allUsers = changes.map((user: any) => new User({
        ...user,
        birthDate: this.convertToDate(user.birthDate)
      }));
      this.updateChartData(); // Ensure updateChartData is called after users are loaded
    });

    const taskCollection = collection(this.firestore, 'tasks');
    this.tasks$ = collectionData(taskCollection, { idField: 'id' });
    this.tasks$.subscribe((changes: any[]) => {
      this.allTasks = changes.map((task: any) => new Task(task));
      this.updateChartData(); // Ensure updateChartData is called after tasks are loaded
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  updateChartData() {
    const employeeTaskCount: { [key: string]: number } = {};

    // Initialize count for all users to 0
    this.allUsers.forEach(user => {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      employeeTaskCount[fullName] = 0;
    });

    // Count tasks for each employee
    this.allTasks.forEach(task => {
      if (task.employee && typeof task.employee === 'string') {
        const employees = task.employee.split(',').map(employee => employee.trim());
        employees.forEach(employee => {
          if (!employeeTaskCount[employee]) {
            employeeTaskCount[employee] = 0;
          }
          employeeTaskCount[employee]++;
        });
      }
    });

    const labels = Object.keys(employeeTaskCount);
    const data = Object.values(employeeTaskCount);

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Tasks per Employee',
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-300'),
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-700'),
          data: data
        }
      ]
    };
  }

  convertToDate(timestamp: any): Date {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date;
  }
}
