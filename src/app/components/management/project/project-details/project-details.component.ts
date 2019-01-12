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
    this.task.getTask(this.project$);
    this.proj.getProjMembers(this.project$);
    this.proj.getProjDetails(this.project$).subscribe(res => {
      console.log(res);
      this.name = res.data.projectDetails.name;
      this.description = res.data.projectDetails.description;
      this.department = res.data.projectDetails.departmentName;
      this.category = res.data.projectDetails.categoryName;
      // this.taskTotal = res.data.projectDetails.
      this.created_at = res.data.projectDetails.created_at;
      this.updated_at = res.data.projectDetails.updated_at;
    });

    this.delay(3000).then(any => {

      this.employeeTotal = this.proj.projMembersList.length;
      this.taskTotal = this.task.taskList.length;

      console.log(this.proj.projList)

    });

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
