import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { filter, first, skip, take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  constructor(private afAuth: Auth, private auth: AuthService, private router: Router) {
  }
  
  login() {
    signInWithPopup(this.afAuth, new GoogleAuthProvider());
    this.auth.user.pipe(filter((user) => !!user),take(1)).subscribe(user => {
      if (user) {
        // User is logged in - redirect to home
        this.router.navigate(['/']);
      }
    });
  }
}
