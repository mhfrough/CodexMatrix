import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TaskComponent } from '../../task/task/task.component';
import { ProjService } from 'src/app/services/proj/proj.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptService } from 'src/app/services/dept/dept.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

  pendingTotal: number = 0;
  inprogressTotal: number = 0;
  completeTotal: number = 0;
  rejectTotal: number = 0;
  approveTotal: number = 0;

  constructor(public app: AppComponent, public proj: ProjService, public task: TaskService,
    public dept: DeptService, public route: ActivatedRoute, public router: Router) {
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


      for (let array of this.task.taskList) {
        if(array.taskStatus == 'pending'){
          this.pendingTotal++;
        }
        if(array.taskStatus == 'in-progress'){
          this.inprogressTotal++;
        }
        if(array.taskStatus == 'completed'){
          this.completeTotal++;
        }
        if(array.taskStatus == 'rejected'){
          this.rejectTotal++;
        }
        if(array.taskStatus == 'approved'){
          this.approveTotal++;
        }
      }
    });

  }

  href(data) {
    console.log(data)
    this.router.navigate(['/employee/' + data]);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
