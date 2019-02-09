import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/services/dept/dept.service';
import { ProjService } from 'src/app/services/proj/proj.service';
import { AppComponent } from 'src/app/app.component';
import { EmpService } from 'src/app/services/emp/emp.service';
import { Router } from '@angular/router';
import { ProjDel } from 'test/CodexMatrix/src/app/interfaces/proj';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {
  public searchString: string;
  isLoading: Boolean = false;
  projDelete: ProjDel;

  constructor(public app: AppComponent, public dept: DeptService, public proj: ProjService,
    public emp: EmpService, public router: Router) { }

  ngOnInit() {
    if (!this.app.isSoftwareHouse) this.router.navigate(['']);
    this.proj.projList = [];
    this.dept.deptList = [];
    this.dept.getDept(localStorage.getItem('companyID'));
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

  onChange(data) {
    if (data == "1") {
      this.oneForAll();
    } else {
      this.proj.getProj(data);
    }
  }

  onDelete(id: string) {
    this.projDelete = {
      projectId: id
    }
    this.proj.deleteProject(this.projDelete).subscribe(res => {
      console.log(res)
      this.app.alerts.push({
        type: 'danger',
        icon: 'report',
        msg: `${res.message}`,
        timeout: 5000
      });
      this.proj.projList = this.proj.projList.filter(proj => proj.id !== id);
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  sortDesc() {
    this.proj.projList = this.proj.projList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  sortAsc() {
    this.proj.projList = this.proj.projList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  viewProjectTask(id: string) {
    console.log(id);
    this.router.navigate(['project-task/' + id]);
  }


}
