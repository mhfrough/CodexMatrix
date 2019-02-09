import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as g from 'src/app/app.globals';
import { TaskReq, TaskPut, TaskAct, AssigTaskReq, TaskStatus } from 'src/app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskData: any;

  taskList: any[] = [];
  taskUser: any[] = [];
  taskListUser: String[] = [];
  taskListDept: String[] = [];
  taskListStatus: String[] = [];

  constructor(private http: HttpClient,
    private router: Router) { }

  getTask(data) {
    this.taskList = [];
    return this.http.get<any>(g.apiURL + '/get-all-tasks-by-project?projId=' + data
    ).subscribe(res => {
      console.log(res)
      res.data.forEach(element => {
        this.taskList.push(element);
      });
    })
  }

  getTaskByDept(data: String) {
    this.taskListDept = [];
    return this.http.get<any>(g.apiURL + '/get-all-tasks-by-department?deptId=' + data
    ).subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.taskListDept.push(element);
      });
    })
  }

  getTaskByUser(data: String) {
    this.taskListUser = [];
    return this.http.get<any>(g.apiURL + '/get-all-tasks-by-user?userId=' + data
    ).subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.taskListUser.push(element);
      });
    })
  }

  getTaskStatus() {
    this.taskListStatus = [];
    return this.http.get<any>(g.apiURL + '/get-status-list'
    ).subscribe(res => {
      console.log(res);
      res.data.forEach(element => {
        this.taskListStatus.push(element);
      });
    })
  }

  getUserTask(dataA: String, dataB: String) {
    console.log(dataA + " " + dataB)
    this.taskUser = [];
    return this.http.get<any>(g.apiURL + '/get-my-tasks?userId=' + dataA + "&statusId=" + dataB
    ).subscribe(res => {
      console.log("my tasks")
      console.log(res);
      res.data.forEach(element => {
        this.taskUser.push(element);
      });
    })
  }

  taskStatus(data: TaskStatus) {
    return this.http.post<any>(g.apiURL + '/submit-task-with-status', data);
  }

  createTask(data: TaskReq) {
    console.log(data);
    return this.http.post<any>(g.apiURL + '/create-task', data);
  }

  updateTask(data: TaskPut) {
    return this.http.post<any>(g.apiURL + '/update-department', data);
  }

  deleteTask(data: TaskAct) {
    return this.http.post<any>(g.apiURL + '/delete-task', data);
  }

  acceptTask(data: TaskAct){
    console.log("accept Task Service");
    return this.http.post<any>(g.apiURL + '/accept-task', data);
  }

  submitTask(data: TaskAct){
    return this.http.post<any>(g.apiURL + '/submit-task', data);
  }

  rejectTask(data: TaskAct){
    return this.http.post<any>(g.apiURL + '/delete-task', data);
  }

  assignTask(data: AssigTaskReq) {
    return this.http.post<any>(g.apiURL + '/assign-task-manually', data);
  }

}
