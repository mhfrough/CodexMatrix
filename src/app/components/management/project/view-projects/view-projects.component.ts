import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/services/dept/dept.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { AppComponent } from 'src/app/app.component';
import { EmpService } from 'src/app/services/emp/emp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {
  public searchString: string;
  isLoading: Boolean = false;

  constructor(public app: AppComponent, public dept: DeptService, public proj: ProjService,
    public emp: EmpService, public router: Router) { }

  ngOnInit() {
    this.proj.projList = [];
    this.dept.deptList = [];
    this.dept.getDept();
    this.delay(3000).then(any => {
      this.oneForAll();
    });
  }

  oneForAll() {
    for (let array of this.dept.deptList) {
      this.proj.getProj(array.id);
    }
  }

  projectDetails(data: string) {
    this.router.navigate(['/project/' + data]);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }


}
