import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-memo-details',
  templateUrl: './memo-details.component.html',
  styleUrls: ['./memo-details.component.css']
})
export class MemoDetailsComponent implements OnInit {

  data:any;
  to:any;
  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(data => {
      this.data = data
      if(data.employee == '0'){
        this.to = "All"
      }
    })
  }

}
