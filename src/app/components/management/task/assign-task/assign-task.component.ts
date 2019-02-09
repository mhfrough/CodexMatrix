import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssigTaskReq } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { AppComponent } from 'src/app/app.component';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from 'src/app/services/fbase/firebase.service';
import { NotificationMessage } from 'src/app/interfaces/firebase';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  alerts: any[] = [];
  givenBy: String = '';
  isLoading: boolean = false;
  rForm: FormGroup;
  dismissible = true;
  assigTaskReq: AssigTaskReq;

  fbase: NotificationMessage;

  taskName;


  constructor(public task: TaskService, public emp: EmpService,
    public fb: FormBuilder, public proj: ProjService, public dept: DeptService,
    public app: AppComponent, private db: AngularFireDatabase,
    public firebase: FirebaseService) {
    if (app.isSoftwareHouse) {
      this.rForm = fb.group({
        'deptId': [null, Validators.required],
        'projId': [null, Validators.required],
        'taskId': [null, Validators.required],
        'givenTo': [null, Validators.required],
        // 'givenBy': [null, Validators.required],
      })
    } else {
      this.rForm = fb.group({
        'taskId': [null, Validators.required],
        'givenTo': [null, Validators.required]
      });
    }
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
    this.emp.getAllEmp(localStorage.getItem('companyID'));
    if (!this.app.isSoftwareHouse) {
      this.task.getTask("");
    }
    // this.givenBy = 'OW0tauqh045YAdoxSfbt11eJuvgrTK0zPUqD';/*localStorage.getItem('companyID');*/
  }

  onChange(data) {
    this.task.getTask(data);
  }

  deptHandle(data) {
    this.proj.getProj(data);
  }

  onSubmit(post) {
    console.log(post.givenBy);

    for (let item of this.task.taskList) {
      if (item.id == post.taskId) {
        this.taskName = item.name;
      }
    }

    this.isLoading = true;
    this.assigTaskReq = {
      taskId: post.taskId,
      // givenBy: post.givenBy,
      givenBy: localStorage.getItem('id'),
      givenTo: post.givenTo
    }

    console.log(this.assigTaskReq);

    this.fbase = {
      id: post.taskId,
      title: "Task Assignment",
      // message: "You have been assigned to " + this.taskName + " by " + localStorage.getItem('name'),
      message: localStorage.getItem('name') + " assigned you a new task",
      from: localStorage.getItem('id'),
      status: "un-read",
      icon: "list_alt"
    }


    this.task.assignTask(this.assigTaskReq).subscribe(res => {
      if (res.status == 1) {
        console.log(res);
        this.firebase.notification(post.givenTo, this.fbase).then(() => this.app.pushNotification("Task Assignment", "You have been assigned to " + this.taskName + " by " + localStorage.getItem('name')));

        // this.db.database.ref('users/' + localStorage.getItem('id')).
        // this.db.object('users/'+ localStorage.getItem('id')).valueChanges()

        this.isLoading = false;
        this.app.alerts.push({
          type: 'success',
          icon: 'done',
          msg: `${res.message}`,
          timeout: 5000
        });
      } else {
        console.log(false)
        this.isLoading = false;
        this.app.alerts.push({
          type: 'warning',
          icon: 'warning',
          msg: `${res.message}`,
          timeout: 5000
        });
      }
    })
    this.rForm.reset();
  }


}
