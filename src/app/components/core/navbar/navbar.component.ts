import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation/navigation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = 'employee name';
  notificationMessages = [];
  
  constructor(public nav: NavigationService, public _auth: AuthService,
    public app: AppComponent) {
  }

  ngOnInit() {
    this.name = localStorage.getItem('name');

    this.delay(3000).then(() => {
      this.notificationMessages = this.app.notificaitonMessages;
    })
  }

  onRead() {
    console.log(1)
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  logOut() {
    this._auth.logOut();
  }

  onClosed(dismissedAlert: any): void {
    this.app.alerts = this.app.alerts.filter(alert => alert !== dismissedAlert);
  }

}
