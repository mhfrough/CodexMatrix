import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation/navigation.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route/previous-route.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;

  constructor(public nav: NavigationService, public app: AppComponent,
    public route: PreviousRouteService) {
  }

  ngOnInit() {
    this.delay(1).then(any => {
      this.currentUrl = this.route.getCurrentUrl().replace('/', '');
    });
  }

  navigate(data) {
    this.currentUrl = data;
    console.log(this.currentUrl);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }
}
