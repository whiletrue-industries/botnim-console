import { Component, effect, signal } from '@angular/core';
import { DataService } from '../data.service';
import { DataViewModule } from 'primeng/dataview';
import { UserDataComponent } from '../user-data/user-data.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  imports: [
    DataViewModule,
    UserDataComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  activeUsers = signal<any[]>([]);
  inactiveUsers = signal<any[]>([]);

  constructor(private data: DataService, private api: ApiService) {
    data.data.pipe(
    ).subscribe(data => {
      if (data) {
        // console.log('data', data);
        this.activeUsers.set((data.userData || []).filter((user: any) => user.conversations?.length > 0));
        this.inactiveUsers.set((data.userData || []).filter((user: any) => user.conversations?.length === 0));
        this.activeUsers.update(users => {
          users.forEach(user => {
            user.lastUsed = user.conversations ? Math.max(...user.conversations.map((conversation: any) =>
              conversation.messageTimestamps[conversation.messageTimestamps.length - 1] || 0
            )) : 0; 
            // console.log('user', user, new Date(user.lastUsed));
          });
          users.sort((a, b) => b.lastUsed - a.lastUsed);
          return users;
        });
      } else {
        this.activeUsers.set([]);
        this.inactiveUsers.set([]);
      }
    });
    effect(() => {
      const users = this.api.users();
      console.log('Users from API service', users);
    });
  }

}
