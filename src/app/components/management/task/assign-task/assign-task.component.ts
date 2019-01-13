import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssigTaskReq } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { AppComponent } from 'src/app/app.component';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(public task: TaskService, public emp: EmpService,
    public fb: FormBuilder, public proj: ProjService, public dept: DeptService,
    public app: AppComponent, private db: AngularFireDatabase) {
    this.rForm = fb.group({
      'deptId': [null, Validators.required],
      'projId': [null, Validators.required],
      'taskId': [null, Validators.required],
      'givenTo': [null, Validators.required],
      'givenBy': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
    this.emp.getAllEmp(localStorage.getItem('companyID'));
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

    this.isLoading = true;
    this.assigTaskReq = {
      taskId: post.taskId,
      givenBy: post.givenBy,
      // givenBy: localStorage.getItem('id'),
      givenTo: post.givenTo
    }

    console.log(this.assigTaskReq);

    this.task.assignTask(this.assigTaskReq).subscribe(res => {
      if (res.status == 1) {
        console.log(res);

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
