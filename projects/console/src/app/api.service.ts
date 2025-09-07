import { computed, effect, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { filter, forkJoin, from, map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export type UserData = {
  id: string,
  email: string,
  display_name: string,
  role: string,
  password?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users = signal<UserData[]>([]);

  BASE_URL = 'https://staging.botnim.co.il/botnim/admin';

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {

    effect(() => {
      if (this.auth.token()) {
        this.loadUsers().subscribe((result) => {
          this.users.set(result);
        });
      } else {
        this.users.set([]);
      }
    });
  }

  callGetApi(endpoint: string, params: any = {}): Observable<any> {
    return this.http.get(this.BASE_URL + endpoint, {
      headers: {
        Authorization: `Bearer ${(this.auth.token())}`
      },
      params: params
    });
  }

  callPostApi(endpoint: string, body: any = {}): Observable<any> {
    return this.http.post(this.BASE_URL + endpoint, body, {
      headers: {
        Authorization: `Bearer ${(this.auth.token())}`
      }
    });
  }

  loadUsers(): Observable<UserData[]> {
    return this.callGetApi('/users').pipe(
      map((response: any) => {
        return (response as UserData[]) || [];
      })
    );
  }

  updateUser(userId: string, data: Partial<UserData>): Observable<any> {
    return this.callPostApi(`/user/${userId}/update`, data).pipe(
      tap(() => {
        // Refresh the users list
        this.loadUsers().subscribe((result) => {
          this.users.set(result);
        });
      })
    );
  }
}