import { Injectable } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}

  async deleteUser(user: User): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${user.id}`);
      await deleteDoc(userDocRef);
      console.log('User successfully deleted!');
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  }
}
