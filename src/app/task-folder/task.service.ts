import { Injectable } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { Task } from '../../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) {}

  async deleteTask(task: Task): Promise<void> {
    try {
      const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
      await deleteDoc(taskDocRef);
      console.log('Task successfully deleted!');
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  }
}