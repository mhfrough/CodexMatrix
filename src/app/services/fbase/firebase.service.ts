import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase, public fAuth: AngularFireAuth) { }

  // Update Notification Messages
  async notification(id, data) {
    try {
      this.db.database.ref(localStorage.getItem('companyID') + '/users/' + id + '/notificaiton').push(data)
    } catch (error) {
      console.error(error);
    }
  }
}
