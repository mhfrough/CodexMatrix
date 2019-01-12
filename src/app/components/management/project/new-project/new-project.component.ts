import { Component, OnInit } from '@angular/core';
import { ProjReq, ProjPut, ProjDel } from 'src/app/interfaces/proj';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjService } from 'src/app/services/proj/proj.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { CatService } from 'src/app/services/cat/cat.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  public searchString: string;
  projReq: ProjReq;
  projPut: ProjPut;
  projDel: ProjDel;
  rForm: FormGroup;

  isUpdate: boolean = false;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = true;

  constructor(public proj: ProjService, public cat: CatService,
    public dept: DeptService, public emp: EmpService,
    public desig: DesigService, public fb: FormBuilder,
    public app: AppComponent) {
    this.rForm = fb.group({
      'projName': [null, Validators.required],
      'catId': [null, Validators.required],
      'deptId': [null, Validators.required],
      'projDes': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dept.getDept();
    this.desig.getDesig(localStorage.getItem('companyID'));
    console.log(this.dept.deptList);
  }

  onChange(data) {
    console.log(data);
    this.cat.getCat(data);
  }

  onSubmit(post) {
    // this.isDisabled = true;
    this.isLoading = true;

    this.projReq = {
      name: post.projName,
      description: post.projDes,
      projCatId: post.catId,
      deptId: post.deptId
    }

    this.proj.createDept(this.projReq).subscribe(res => {
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

  // Assign Employee

  handleDesig(){
    
  }
}
