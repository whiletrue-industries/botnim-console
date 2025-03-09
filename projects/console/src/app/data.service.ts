import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ReplaySubject } from 'rxjs';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = new ReplaySubject<any>(1);

  constructor(private auth: AuthService, private firestore: Firestore) {
    auth.user.subscribe(user => {
      if (user) {
        // User is logged in - load the document "/user-stats/user-stats" from Firestore:
        const docRef = doc(this.firestore, 'user-stats', 'user-stats');
        getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            this.data.next(docSnap.data());
          } else {
            this.data.next(null);
          }
        }).catch(err => {
          this.data.next(null);
        });
      } else {
        this.data.next(null);
      }
    });
  }
}
