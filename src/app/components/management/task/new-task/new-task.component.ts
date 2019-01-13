import { Component, OnInit } from '@angular/core';
import { TaskReq } from 'src/app/interfaces/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeptService } from 'src/app/services/dept/dept.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { SkilService } from 'src/app/services/skil/skil.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  taskReq: TaskReq;
  selectedSkills: any[];

  alerts: any[] = [];
  isLoading: boolean = false;
  rForm: FormGroup;
  dismissible = true;
  constructor(public task: TaskService, public proj: ProjService,
    public dept: DeptService, public skil: SkilService, 
    public fb: FormBuilder, public app: AppComponent) {
    this.rForm = fb.group({
      'deptId': [null, Validators.required],
      'projId': [null, Validators.required],
      'taskName': [null, Validators.required],
      'taskDes': [null, Validators.required],
      'date': [null, Validators.required],
      'priority': [null, Validators.required],
      'skills': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
  }

  onChange(data) {
    console.log(data);
    this.proj.getProj(data);
    this.skil.getSkill(data);
  }

  clickedOption() {
    console.log(this.selectedSkills)
  }

  onSubmit(post) {
    this.isLoading = true;

    console.log(this.selectedSkills.toString());

    this.taskReq = {
      projId: post.projId,
      name: post.taskName,
      description: post.taskDes,
      estimated_time: '60',
      priority: post.priority,
      required_skills: this.selectedSkills.toString(),
      taskCreatorId: localStorage.getItem('id')
    }

    this.task.createTask(this.taskReq).subscribe(res => {
      console.log(res);
      if (res.status == 1) {
        this.isLoading = false;
        // Department Creation Successful
        this.app.alerts.push({
          type: 'success',
          icon: 'done',
          msg: `${res.message}`,
          timeout: 5000
        });
      } else {
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
