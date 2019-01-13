import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/services/dept/dept.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'src/app/services/task/task.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { Chart } from 'chart.js';
import { TaskAct } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  chart: any[];
  data: any;

  taskAct: TaskAct;

  constructor(public dept: DeptService, public proj: ProjService,
    public task: TaskService, public emp: EmpService) { }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
    this.delay(2000).then(any => {
      this.task.getTaskByDept(this.dept.deptList[0].id);
      this.emp.getAllEmp(localStorage.getItem('companyID'));
    });

    this.task.getTaskStatus();
    this.task.getUserTask(localStorage.getItem('id'), "d442599c-c4e7-11e8-941d-d0bf9ce16c80");

    this.data = {
      datasets: [
        {
          data: [50, 10, 10, 40, 10],
          backgroundColor: ["#c4183c", "#17c671", "#007bff", "#ffb400", "#674eec"]
                          /* RED,       GREEN,     BLUE,      YELLOW,    PURPLE */
        }
      ],

      labels: [
        'rejected','complete','approved','pending','in-progress'
      ]
    };

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: this.data,
    })
  }

  handleDept(data) {
    this.task.getTaskByDept(data);
  }

  handleUser(data) {
    this.task.getTaskByUser(data);
  }

  handleStatus(data){
    console.log(data);
    this.task.getUserTask("jOcNmjezUhZ8SzkVB3o6KMi7vwi25St3WDwA", data);
  }

  acceptTask(data){
    console.log(data);
    this.task.acceptTask(data).subscribe(res => {
      console.log(res);
    });
  }
  submitTask(data){
    this.task.submitTask(data);
  }
  rejectTask(data){
    this.task.rejectTask(data);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}
