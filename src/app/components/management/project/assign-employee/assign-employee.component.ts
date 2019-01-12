import { Component, OnInit } from '@angular/core';
import { EmpProjReq } from 'src/app/interfaces/proj';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjService } from 'src/app/services/proj/proj.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { AppComponent } from 'src/app/app.component';
import { EmpService } from 'src/app/services/emp/emp.service';

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.css']
})
export class AssignEmployeeComponent implements OnInit {

  empProjReq: EmpProjReq;
  rForm: FormGroup;
  dismissible = true;

  isUpdate: boolean = false;
  deptId: any;
  projId: any;
  empId: any;
  desigId: any;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = true;

  constructor(public proj: ProjService, public dept: DeptService,
    public emp: EmpService, public desig: DesigService,
    public fb: FormBuilder, public app: AppComponent) {
    this.rForm = fb.group({
      'deptId': [null, Validators.required],
      'projId': [null, Validators.required],
      'empId': [null, Validators.required],
      'desigId': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.dept.getDept();
    this.desig.getDesig(localStorage.getItem('companyID'));
    console.log(this.dept.deptList);
  }


  onChange(data) {
    console.log(data);
    this.emp.getEmp(data, false);
    this.proj.getProj(data);
  }


  onSubmit(post) {
    this.isLoading = true;

    console.log(post)

    this.empProjReq = {
      userId: post.empId,
      designationId: post.desigId,
      projId: post.projId,
    }

    console.log(this.empProjReq);

    this.proj.assignEmp(this.empProjReq).subscribe(res => {
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
