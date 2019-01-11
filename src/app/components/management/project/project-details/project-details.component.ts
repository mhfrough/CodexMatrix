import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TaskComponent } from '../../task/task/task.component';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { DeptService } from 'src/app/services/dept/dept.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project$: string;

  // Properties
  name: string;
  description: string;
  department: string;
  category: string;
  taskTotal: number;
  employeeTotal: number;
  created_at: string;
  updated_at: string;

  constructor(public app: AppComponent, public proj: ProjService, public task: TaskService,
    public dept: DeptService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => this.project$ = params.id);
  }

  ngOnInit() {
    this.dept.deptList = [];
    this.dept.getDept();

    for (let array of this.dept.deptList) {
      this.proj.getProj(array.id);
    }

    this.proj.getProjMembers(this.project$);
    this.task.getTask(this.project$);

    this.delay(3000).then(any => {

      this.name = this.proj.projList.find(x => x.id == this.project$).name;
      this.description = this.proj.projList.find(x => x.id == this.project$).description;
      this.created_at = this.proj.projList.find(x => x.id == this.project$).created_at;
      this.updated_at = this.proj.projList.find(x => x.id == this.project$).updated_at;

      this.employeeTotal = this.proj.projMembersList.length;
      this.taskTotal = this.task.taskList.length;

      console.log(this.task.taskList);
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
