import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../models/user.class';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-preview',
  standalone: true,
  imports: [UserComponent, RouterModule, MatCardModule, CommonModule],
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss'
})
export class UserPreviewComponent {

  user = new User();
  users$: Observable<any[]> = new Observable();
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  
  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });
    this.users$.subscribe((changes: any[]) => {
      this.allUsers = changes.map((user: any) => new User({
        ...user,
        birthDate: this.convertToDate(user.birthDate)
      }));
    });
    
  }

  convertToDate(timestamp: any): Date {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date; // Rückgabe eines gültigen Datums oder eines Standardwertes
  }
}
