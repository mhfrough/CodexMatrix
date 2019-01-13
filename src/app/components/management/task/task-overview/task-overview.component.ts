import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/services/dept/dept.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {

  constructor(public dept: DeptService) { }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));

    console.log(this.dept.deptList);
    
  }

}
