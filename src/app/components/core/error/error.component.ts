import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route/previous-route.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(public router: Router, public prevRoute: PreviousRouteService) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate([this.prevRoute.getPreviousUrl()]);
  }

}
