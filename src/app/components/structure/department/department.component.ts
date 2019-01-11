import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DeptReq, DeptPut, DeptDel } from 'src/app/interfaces/dept';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeptService } from 'src/app/services/dept/dept.service';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  public searchString: string;
  deptReq: DeptReq;
  deptPut: DeptPut;
  deptDel: DeptDel;

  rForm: FormGroup;
  isLoading: Boolean = false;

  id: String = '';
  name: String = '';
  isUpdate: boolean = false;

  constructor(public dept: DeptService, public app: AppComponent,
    public fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)
      ])]
    });

  }

  ngOnInit() {
    this.dept.deptList = [];
    this.getAllDept();
    this.app.reset();
    this.dept.deptList = this.dept.deptList.sort((a, b) => 0 - (a > b ? 1 : -1));
  }

  sortName() {
    this.dept.deptList = this.dept.deptList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  sortDesc() {
    this.dept.deptList = this.dept.deptList.sort((a, b) => 0 - (a > b ? -1 : 1));
  }

  sortAsc() {
    this.dept.deptList = this.dept.deptList.sort((a, b) => 0 - (a > b ? 1 : 1));
  }

  // Get All Departments
  getAllDept() {
    this.isLoading = true;
    this.dept.getDept();
    this.isLoading = false;
  }

  // Add New Department
  onSubmit(post) {
    this.isLoading = true;

    if (!this.isUpdate) {
      this.deptReq = {
        name: post.name,
        companyId: localStorage.getItem('companyID')
      }

      this.dept.createDept(this.deptReq).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          // Department Creation Successful
          this.app.alerts.push({
            type: 'success',
            icon: 'done',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDept();
        } else {
          this.isLoading = false;
          console.log(res);
          this.app.alerts.push({
            type: 'warning',
            icon: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    } else {

      console.log(post.name);
      this.deptPut = {
        id: this.id,
        name: post.name
      }

      this.dept.updateDept(this.deptPut).subscribe(res => {
        if (res.status == 1) {
          this.isLoading = false;
          console.log(res);
          // Department Update Successful
          this.app.alerts.push({
            type: 'info',
            icon: 'priority_high',
            msg: `${res.message}`,
            timeout: 5000
          });
          this.getAllDept();
        } else {
          this.isLoading = false;
          console.log(res);
          this.app.alerts.push({
            type: 'warning',
            icon: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      });
    }
    this.rForm.reset();
    this.app.reset();

  }

  onUpdate(id: String, name: String) {
    this.app.action = 'Update';
    this.app.button = 'Update';
    this.id = id;
    this.name = name;
    // this.rForm.reset();
    this.isUpdate = true;
  }

  onDelete(id: String) {
    this.isLoading = true;
    this.deptDel = {
      id: id
    }

    this.dept.deleteDept(this.deptDel).subscribe(res => {
      // Department Deleted
      this.isLoading = false;
      this.app.alerts.push({
        type: 'danger',
        icon: 'report',
        msg: `${res.message}`,
        timeout: 5000
      });
      this.getAllDept();
    });

    this.rForm.reset();
    this.app.reset();
  }


}
