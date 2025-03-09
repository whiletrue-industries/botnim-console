import { Component, signal } from '@angular/core';
import { DataService } from '../data.service';
import { DataViewModule } from 'primeng/dataview';
import { UserDataComponent } from '../user-data/user-data.component';

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

  constructor(private data: DataService) {
    data.data.pipe(
    ).subscribe(data => {
      if (data) {
        console.log('data', data);
        this.activeUsers.set((data.userData || []).filter((user: any) => user.conversations?.length > 0));
        this.inactiveUsers.set((data.userData || []).filter((user: any) => user.conversations?.length === 0));
      } else {
        this.activeUsers.set([]);
        this.inactiveUsers.set([]);
      }
    });
  }

}
