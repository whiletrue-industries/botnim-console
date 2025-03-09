import { Component, Input, OnChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-user-data',
  imports: [
    ButtonModule,
    CardModule,
    PanelModule,
    ChartModule
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.less'
})
export class UserDataComponent implements OnChanges{
  @Input() user: any;
  json: string;

  dayOfWeekCount = [0, 0, 0, 0, 0, 0, 0];
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

  ngOnChanges() {
    this.json = JSON.stringify(this.user, null, 2);
    const now = new Date().getTime();
    for (let conversation of this.user.conversations) {
      this.totalConversations += 1;
      for (let message of conversation.messageTimestamps) {
        const timestamp = message.seconds * 1000;
        const date = new Date(timestamp);
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
    console.log(this.dayOfWeekCount);
  }
}
