import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.class';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormField, MatLabel, MatDialogModule, MatInputModule, AppComponent, FormsModule, MatProgressBar, MatDatepickerModule, MatButtonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  userid = '';
  user!: User;
  birthDate: Date | null = null;
  loading = false;
  firestore: Firestore = inject(Firestore);
  
  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.user = new User(this.data.user); 
      this.birthDate = this.user.birthDate instanceof Date ? this.user.birthDate : new Date(this.user.birthDate);
    }
  }

  async saveUser() {
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    const userDocRef = doc(this.firestore, `users/${this.user.id}`);
    await updateDoc(userDocRef, this.user.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}