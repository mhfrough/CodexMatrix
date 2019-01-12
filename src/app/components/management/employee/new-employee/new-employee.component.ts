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
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
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
  empMgr: String = "";
  isUpdate: boolean = false;

  fieldsDisabled: boolean = false;

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
      ])],
      'empPassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
      'empDept': [null, Validators.required],
      'empMgr': [null, Validators.required],
      'empRole': [null, Validators.required],
      'empDesig': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dept.getDept();
    this.desig.getDesig(localStorage.getItem('companyID'));
    this.rol.getRole();

    if (this.user$ != null) {

      this.fieldsDisabled = true;

      this.delay(1000).then(any => {
        this.empName = this.emp.empList.find(x => x.id == this.user$.toString()).name;
        this.empEmail = this.emp.empList.find(x => x.id == this.user$.toString()).email;
        this.empPassword = this.emp.empList.find(x => x.id == this.user$.toString()).password;
        this.empMgr = this.emp.empList.find(x => x.id == this.user$.toString()).mgrName;
        this.empDept = this.emp.empList.find(x => x.id == this.user$.toString()).departmentName;
        // this.empName = this.emp.allEmpList.find(x => x.id == this.user$.toString()).name;
      });

    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  // getAllEmp() {
  //   this.isLoading = true;
  //   this.emp.getEmp(localStorage.getItem('companyID'));
  //   this.isLoading = false;
  // }

  sortName() {
    console.log(1)
    this.emp.empList = this.emp.empList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  sortMgr() {
    this.emp.empList = this.emp.empList.sort((a, b) => 0 - (a.mgrName.rendered > b.mgrName.rendered ? -1 : 1));
  }

  handleEmp(data) {
    this.emp.getEmp(data, true);
  }

  onChange(data) {
    this.emp.getEmp(data, false);
    console.log(data);
  }

  onSubmit(post) {
    this.isLoading = true;

    if (!this.isUpdate) {
      this.empReq = {
        name: post.empName,
        email: post.empEmail,
        password: post.empPassword,
        deviceType: 'none',
        deviceToken: 'none',
        deptId: post.empDept,
        mgr: post.empMgr,
        roleId: post.empRole,
        designationId: post.empDesig,
      }

      this.emp.createEmp(this.empReq).subscribe(res => {
        console.log(res)
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          this.app.alerts.push({
            type: 'success',
            icon: 'priority_high',
            msg: `${res.message}`,
            timeout: 5000
          });
        } else {
          this.isLoading = false;
          this.alerts.push({
            type: 'warning',
            icon: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      })
    } else {
      console.log('update');
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
            icon: 'priority_high',
            msg: `${res.message}`,
            timeout: 5000
          });
        } else {
          this.isLoading = false;
          this.alerts.push({
            type: 'warning',
            icon: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      })
    }

    this.rForm.reset();
    this.app.reset();

  }

  

  onUpdate(id: String, name: String, email: String, password: String
    , deptId: String, mgr: String) {

    this.id = id;
    this.empName = name;
    this.empEmail = email;
    this.empDept = deptId
    this.empPassword = password;
    this.empMgr = mgr;
    this.isUpdate = true;

    console.log(this.isUpdate);
  }

  onDelete(id: String) {
    this.isLoading = true;
    this.empDel = {
      userId: id
    }
    this.emp.deleteEmp(this.empDel).subscribe(res => {
      // Department Deleted
      this.isLoading = false;
      this.alerts.push({
        type: 'danger',
        msg: `${res.message}`,
        timeout: 5000
      });
    })

  }

}
