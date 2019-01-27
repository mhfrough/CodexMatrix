import { Component, OnInit } from '@angular/core';
import { EmpProjReq } from 'src/app/interfaces/proj';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjService } from 'src/app/services/proj/proj.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { AppComponent } from 'src/app/app.component';
import { EmpService } from 'src/app/services/emp/emp.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NotificationMessage } from 'src/app/interfaces/firebase';
import { FirebaseService } from 'src/app/services/fbase/firebase.service';
import { Router } from '@angular/router';

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
  projName: any;
  empName: any;

  fbase: NotificationMessage;

  alerts: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = true;

  constructor(public proj: ProjService, public dept: DeptService,
    public emp: EmpService, public desig: DesigService,
    public fb: FormBuilder, public app: AppComponent,
    public firebase: FirebaseService, public router: Router) {
    this.rForm = fb.group({
      'deptId': [null, Validators.required],
      'projId': [null, Validators.required],
      'empId': [null, Validators.required],
      'desigId': [null, Validators.required],
    });
  }

  ngOnInit() {
    if (!this.app.isSoftwareHouse) this.router.navigate(['']);
    this.dept.getDept(localStorage.getItem('companyID'));
    this.desig.getDesig(localStorage.getItem('companyID'));
    console.log(this.dept.deptList);
  }


  onChange(data) {
    console.log(data);
    this.emp.getEmp(data, false);
    this.proj.getProj(data);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  todos$: AngularFireList<any[]>;

  onSubmit(post) {
    this.isLoading = true;

    console.log(post)

    for (let item of this.proj.projList) {
      if (item.id == post.projId) {
        this.projName = item.name;
      }
    }

    this.empProjReq = {
      userId: post.empId,
      designationId: post.desigId,
      projId: post.projId,
    }

    // 

    this.fbase = {
      id: post.projId,
      title: "Project Assignment",
      message: "You are assigned to a new project called " + this.projName + " by " + localStorage.getItem('name'),
      from: localStorage.getItem('id'),
      status: "un-read",
      icon: "assignment_ind"
    }



    this.proj.assignEmp(this.empProjReq).subscribe(res => {
      console.log(res);
      if (res.status == 1) {
        this.isLoading = false;
        // Department Creation Successful
        this.firebase.notification(post.empId, this.fbase).then(() => console.log("Notify"));
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
