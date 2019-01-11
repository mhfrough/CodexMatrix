import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation/navigation.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private nav: NavigationService, private app: AppComponent) { }

  ngOnInit() {
    this.app.alerts = [];
    this.nav.show();
  }
}
