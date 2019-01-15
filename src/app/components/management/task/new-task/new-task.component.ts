import { Component, OnInit } from '@angular/core';
import { TaskReq } from 'src/app/interfaces/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeptService } from 'src/app/services/dept/dept.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { SkilService } from 'src/app/services/skil/skil.service';
import { AppComponent } from 'src/app/app.component';

export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  public items = [];

  taskReq: TaskReq;
  selectedSkills = [];
  public item = [];

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
      // 'skills': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
  }

  onChange(data) {
    console.log(data);
    this.proj.getProj(data);
    this.skil.getSkill(data);
    this.delay(3000).then(any => {
      this.items = this.skil.skilList;
      console.log(this.items)
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  onAdd(data) {
    console.log(data.name)
    this.selectedSkills.push(data.name.toString());
    console.log(this.selectedSkills.toLocaleString());
    console.log(this.selectedSkills);
  }

  onRemove(data) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(data), 1);
    console.log(this.selectedSkills.toLocaleString());
    console.log(this.selectedSkills);
  }

  onSubmit(post) {
    this.isLoading = true;

    console.log(1);
    console.log(this.selectedSkills);
    console.log(2);
    this.taskReq = {
      projId: post.projId,
      name: post.taskName,
      description: post.taskDes,
      estimated_time: '60',
      priority: post.priority,
      required_skills: this.selectedSkills.toString(),
      taskCreatorId: localStorage.getItem('id')
    }

    console.log(this.taskReq);

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
