import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,        
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
];
