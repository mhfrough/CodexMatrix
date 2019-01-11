import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { ViewEmployeesComponent } from '../view-employees/view-employees.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  @ViewChild(ViewEmployeesComponent) users;
  abc:string;


  user$: string;

  name: string = '';
  email: string = '';
  designation: string = '';
  role: string = '';
pending: number;

  constructor(private route: ActivatedRoute, private task: TaskService,
    private dept: DeptService, private emp: EmpService) {
    this.route.params.subscribe(params => this.user$ = params.id);
  }

  ngOnInit() {
    // pending task
    this.task.getUserTask(this.user$, "d442599c-c4e7-11e8-941d-d0bf9ce16c80");
    console.log(32);
    console.log(this.task.taskListUser);
    this.pending = this.task.taskListUser.length;
    // console.log(this.task.taskListUser.length)

    // find all employees from all departments
    for (let array of this.dept.deptList) {
      this.emp.getEmp(array.id, false);
    }

    this.emp.empList;

    // console.log(this.emp.empList);

    // if (this.user$ != '') {
    this.delay(10000).then(any => {
      this.name = this.emp.empList.find(x => x.id == this.user$).name;
      this.email = this.emp.empList.find(x => x.id == this.user$).email;
    });
    // }

    // console.log("user id");
    // console.log(this.users)
  }

  ngAfterViewInit() {
    this.abc = this.users;
    console.log(this.abc);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  handleInProgressTask() {
    // in-progress task
    this.task.getUserTask(this.user$, "d442919d-c4e7-11e8-941d-d0bf9ce16c80");
  }

  handlePendingTask() {
    // pending task
    this.task.getUserTask(this.user$, "d442599c-c4e7-11e8-941d-d0bf9ce16c80");
  }

  handleCompletedTask() {
    // completed task
    this.task.getUserTask(this.user$, "f1bc127a-c4e7-11e8-941d-d0bf9ce16c80");
  }



}
