import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  user = signal<User | null>(null);
  constructor(public auth: AuthService) {
    auth.user.subscribe(user => {
      this.user.set(user);
    });
  }

  ngOnInit() {

  }
}
