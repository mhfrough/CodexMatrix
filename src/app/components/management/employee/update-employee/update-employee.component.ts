import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EmpReq, EmpPut, EmpDel } from 'src/app/interfaces/emp';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from 'src/app/services/emp/emp.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  public searchString: string;
  empReq: EmpReq;
  empPut: EmpPut;
  empDel: EmpDel;

  rForm: FormGroup;
  dismissible = true;

  id: String = "";
  empName: String = "";
  empEmail: String = "";
  empPassword: String = "";
  empDept: String = "";
  empDesig: string = '';
  empRole: string = '';
  empMgr: String = "";

  alerts: any[] = [];
  isLoading: boolean = false;

  user$: Object;

  constructor(public emp: EmpService, public dept: DeptService,
    public rol: RolService, public desig: DesigService,
    public app: AppComponent, public fb: FormBuilder,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.user$ = params.id);

    this.rForm = fb.group({
      'empName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)])],
      'empEmail': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])]
    });
  }


  ngOnInit() {
    this.dept.getDept();
    this.desig.getDesig(localStorage.getItem('companyID'));
    this.rol.getRole();

    this.delay(1000).then(any => {
      this.empName = this.emp.empList.find(x => x.id == this.user$.toString()).name;
      this.empEmail = this.emp.empList.find(x => x.id == this.user$.toString()).email;
      this.empPassword = this.emp.empList.find(x => x.id == this.user$.toString()).password;
      this.empMgr = this.emp.empList.find(x => x.id == this.user$.toString()).mgrName;
      this.empDept = this.emp.empList.find(x => x.id == this.user$.toString()).departmentName;
      this.empDesig = this.emp.empList.find(x => x.id == this.user$.toString()).designationName;
      this.empRole = this.emp.empList.find(x => x.id == this.user$.toString()).roleName;
    });

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
  onSubmit(post) {
    this.isLoading = true;

    this.empPut = {
      userId: post.id,
      name: post.empName,
      email: post.empEmail,
      deptId: post.empDept,
      password: post.empPassword,
      mgr: '0'
    }

    this.emp.updateEmp(this.empPut).subscribe(res => {
      if (res.status == 1) {
        this.isLoading = false;
        this.alerts.push({
          type: 'info',
          msg: `${res.message}`,
          timeout: 5000
        });
      } else {
        this.isLoading = false;
        this.alerts.push({
          type: 'warning',
          msg: `${res.message}`,
          timeout: 5000
        });
      }
    })


  }

}
