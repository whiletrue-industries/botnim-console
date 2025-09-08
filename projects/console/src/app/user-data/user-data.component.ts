import { Component, computed, Input, OnChanges, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { ApiService, UserData } from '../api.service';
import { EditFieldComponent } from '../edit-field/edit-field.component';
registerLocaleData(localeHe);

@Component({
  selector: 'app-user-data',
  imports: [
    ButtonModule,
    CardModule,
    PanelModule,
    ChartModule,
    DatePipe,
    EditFieldComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.less'
})
export class UserDataComponent implements OnChanges{
  @Input() user: any;
  @Input() active = true;
  json: string;

  dayOfWeekCount = [0, 0, 0, 0, 0, 0, 0];
  lastUsed: Date | null = null;
  totalMessages = 0;
  totalConversations = 0;
  lastWeekMessages = 0;
  lastMonthMessages = 0;
  chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1.25,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  };

  chartData = {
    labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    datasets: [
      {
        label: 'שימוש לפי יום בשבוע',
        data: this.dayOfWeekCount,
        borderWidth: 1
      }
    ]
  };

  user_ = signal<any>({});

  userProperties = computed<UserData>(() => {
    const id = this.id();
    const users = this.api.users();
    return users.find((u: any) => u.id === id) || ({} as UserData);
  });

  displayName = computed(() => {
    const userProps = this.userProperties() || {};
    const user = this.user_();
    return userProps.display_name || user.name || 'משתמש אנונימי';
  });

  id = computed(() => {
    const user = this.user_();
    return user.id;
  });

  username = computed(() => {
    const user = this.user_();
    return user.email;
  });

  email = computed(() => {
    const userProps = this.userProperties() || {};
    const user = this.user_();
    return userProps.email || 'אימייל לא ידוע';
  });

  role = computed(() => {
    const userProps = this.userProperties() || {};
    return userProps.role || 'תפקיד לא ידוע';
  });

  userData = computed<UserData>(() => {
    return {
      id: this.id(),
      email: this.email(),
      display_name: this.displayName(),
      role: this.role()
    };
  });

  constructor(private api: ApiService) {}

  ngOnChanges() {
    this.json = JSON.stringify(this.user, null, 2);
    this.user_.set(this.user);
    const now = new Date().getTime();
    for (let conversation of this.user.conversations) {
      this.totalConversations += 1;
      for (let message of conversation.messageTimestamps) {
        const timestamp = message.seconds * 1000;
        const date = new Date(timestamp);
        if (!this.lastUsed || date > this.lastUsed) {
          this.lastUsed = date;
        }
        const dayOfWeekIdx = date.getDay();
        this.dayOfWeekCount[dayOfWeekIdx] += 1;
        this.totalMessages += 1;
        if (now - timestamp < 7 * 24 * 60 * 60 * 1000) {
          this.lastWeekMessages += 1;
        }
        if (now - timestamp < 30 * 24 * 60 * 60 * 1000) {
          this.lastMonthMessages += 1;
        }
      }
    }
    // console.log(this.dayOfWeekCount);
  }

  update(update: any) {
    console.log('Updating user', this.id(), update);
    this.api.updateUser(this.id(), update).subscribe(() => {
      // Handle successful update
      console.log('User updated successfully');
    });
  }
}
