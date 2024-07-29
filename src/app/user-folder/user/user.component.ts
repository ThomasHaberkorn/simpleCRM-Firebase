import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, DialogAddUserComponent, MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = new User();
  users$: Observable<any[]> = new Observable();
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore, private userService: UserService) { }

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
    return isNaN(date.getTime()) ? new Date() : date; 
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  async delUser(user: User, event: Event) {
    event.stopPropagation(); 
    await this.userService.deleteUser(user); 
    this.allUsers = this.allUsers.filter(u => u.id !== user.id); 
  }
}

