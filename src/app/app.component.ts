import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';


const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)!;
    return new User(data);
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, RouterModule, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);

  
  

  constructor() {

  }
}

