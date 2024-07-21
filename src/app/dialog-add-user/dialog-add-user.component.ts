import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';

// import { NoteListService } from '../firebase-service/note-list.service';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, AppComponent, MatProgressBarModule, MatButtonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date | null = null;
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}
  ngOnInit(): void {

  }



  getUser() {
    return collection(this.firestore, 'users');
  } 

  getSingleDoc(colId: string, docId: string) {
      return doc(collection(this.firestore, colId), docId);
  }

  async saveUser() {
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    const usersRef = collection(this.firestore, 'users');
    await addDoc(usersRef, this.user.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}

