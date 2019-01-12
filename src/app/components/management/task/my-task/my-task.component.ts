import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DeptService } from 'src/app/services/dept/dept.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'src/app/services/task/task.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { AppComponent } from 'src/app/app.component';
import { TaskStatus } from 'src/app/interfaces/task';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {

  taskStatus: TaskStatus;

  chart: any[];
  data: any;
  options: any;
  assignedBy: string = '';
  public searchString: string;
  taskName: String = '';
  isLoading: Boolean = false;

  myTasks: any[] = [];
  assignedTasks: any[];

  pendingTotal: number = 0;
  inprogressTotal: number = 0;
  completeTotal: number = 0;
  rejectTotal: number = 0;
  approveTotal: number = 0;
  totalTasks: number = 0;


  constructor(public app: AppComponent, public dept: DeptService, public proj: ProjService,
    public task: TaskService, public emp: EmpService) { }

  ngOnInit() {
    this.assignedBy = localStorage.getItem('id');
    this.task.getTaskStatus();
    this.allTasks();

    this.myTasks = this.task.taskUser;
    this.totalTasks = this.task.taskUser.length;

    this.delay(3000).then(any => {
      for (let array of this.task.taskUser) {
        if(array.status == 'pending'){
          this.pendingTotal++;
        }
        if(array.status == 'in-progress'){
          this.inprogressTotal++;
        }
        if(array.status == 'completed'){
          this.completeTotal++;
        }
        if(array.status == 'rejected'){
          this.rejectTotal++;
        }
        if(array.status == 'approved'){
          this.approveTotal++;
        }
      }

    });
  }

  allTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "d442599c-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(localStorage.getItem('id'), "fd1783d9-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(localStorage.getItem('id'), "d442919d-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(localStorage.getItem('id'), "f1bc127a-c4e7-11e8-941d-d0bf9ce16c80");
    this.task.getUserTask(localStorage.getItem('id'), "f1bc2bcc-c4e7-11e8-941d-d0bf9ce16c80");
  }

  pendingTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "d442599c-c4e7-11e8-941d-d0bf9ce16c80");
  }

  inprogressTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "d442919d-c4e7-11e8-941d-d0bf9ce16c80");
  }

  completeTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "f1bc127a-c4e7-11e8-941d-d0bf9ce16c80");
  }

  rejectTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "f1bc2bcc-c4e7-11e8-941d-d0bf9ce16c80");
  }

  approveTasks(){
    this.task.taskUser = [];
    this.task.getUserTask(localStorage.getItem('id'), "fd1783d9-c4e7-11e8-941d-d0bf9ce16c80");
  }

  acceptTask(data) {
    this.isLoading = true;
    console.log(data);
    this.taskStatus = {
      userId: localStorage.getItem('id'),
      taskId: data,
      statusId: 'd442919d-c4e7-11e8-941d-d0bf9ce16c80'
    }
    this.task.taskStatus(this.taskStatus).subscribe(res => {
      console.log(res);
      this.allTasks();
      this.isLoading = false;
    });
  }

  rejectTask(data){
    this.isLoading = true;
    console.log(data);
    this.taskStatus = {
      userId: localStorage.getItem('id'),
      taskId: data,
      statusId: 'f1bc2bcc-c4e7-11e8-941d-d0bf9ce16c80'
    }
    this.task.taskStatus(this.taskStatus).subscribe(res => {
      console.log(res);
      this.allTasks();
      this.isLoading = false;
    });
  }

  submitTask(data){
    this.isLoading = true;
    console.log(data);
    this.taskStatus = {
      userId: localStorage.getItem('id'),
      taskId: data,
      statusId: 'f1bc127a-c4e7-11e8-941d-d0bf9ce16c80'
    }
    this.task.taskStatus(this.taskStatus).subscribe(res => {
      console.log(res);
      this.allTasks();
      this.isLoading = false;
    });
  }

  approveTask(data){
    this.isLoading = true;
    console.log(data);
    this.taskStatus = {
      userId: localStorage.getItem('id'),
      taskId: data,
      statusId: 'fd1783d9-c4e7-11e8-941d-d0bf9ce16c80'
    }
    this.task.taskStatus(this.taskStatus).subscribe(res => {
      console.log(res);
      this.allTasks();
      this.isLoading = false;
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
