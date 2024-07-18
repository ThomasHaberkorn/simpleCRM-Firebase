import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, DialogAddUserComponent, MatCardModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  user = new User();
  users$: Observable<any[]> = new Observable();
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
  //  this.firestore.collection('users').valueChanges().subscribe((changes: any) => {console.log("Changes: ", changes)});
  const usersCollection = collection(this.firestore, 'users');
  this.users$ = collectionData(usersCollection);
  this.users$.subscribe((changes: any) => {
    this.allUsers = changes;
  });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  
}
