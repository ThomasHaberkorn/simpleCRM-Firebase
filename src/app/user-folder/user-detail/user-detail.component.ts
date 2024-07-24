import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from '../user/user.component';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from '../../../models/user.class';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, UserComponent, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  userId = '';
  user$: Observable<User | undefined> = of(undefined);

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.getUser();
    });
    
  }

  getUser() {
    const userDoc = doc(this.firestore, `users/${this.userId}`);
    this.user$ = docData(userDoc) as Observable<User | undefined>;
    this.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
      console.log(this.user);
    });
    
  }

  editUserDetail() {
    this.user.id = this.userId;
    this.dialog.open(DialogEditUserComponent, {
      data: { user: this.user }
    });

  }

  editAddressDetail() {
    this.user.id = this.userId;
    this.dialog.open(DialogEditAddressComponent, {
      data: { user: this.user }
    });
  }
}
