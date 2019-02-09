import { Component, OnInit } from '@angular/core';
import { ProjReq, ProjPut, ProjDel } from 'src/app/interfaces/proj';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjService } from 'src/app/services/proj/proj.service';
import { EmpService } from 'src/app/services/emp/emp.service';
import { CatService } from 'src/app/services/cat/cat.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { SkilService } from 'src/app/services/skil/skil.service';

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

  message: any = {
    id: '',
    name: '',
    description: ''
  };

  constructor(public proj: ProjService, public cat: CatService,
    public dept: DeptService, public emp: EmpService,
    public desig: DesigService, public fb: FormBuilder,
    public app: AppComponent, public router: Router, public skil:SkilService) {
    this.rForm = fb.group({
      'projName': [null, Validators.required],
      'catId': [null, Validators.required],
      'deptId': [null, Validators.required],
      'projDes': [null, Validators.required]
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

    this.proj.createProject(this.projReq).subscribe(res => {
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
        this.message.name = res.data.name;
        this.message.description = res.data.description;
        this.message.id = res.data.id;

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

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  // Assign Employee

  handleDesig() {

  }

  // Pop-up Models

  nameValue;
  deptValue;
  departmentMsg: string = '';
  categoryMsg: string = '';
  skillMsg: string = '';

  addDepartment(data) {
    this.departmentMsg = "Waiting...";
    this.dept.createDept({ name: data, companyId: localStorage.getItem('companyID') })
      .subscribe(res => {
        console.log(res)
        if (res.status == 1) {
          this.dept.deptList.push(res.data);
          this.departmentMsg = "New Department Added Successfully!";
        } else {
          this.departmentMsg = "Error! Department Not Added";
        }
        this.nameValue = '';
        this.delay(3000).then(() => this.departmentMsg = '');
      });
  }

  addCategory(data1, data2) {
    this.categoryMsg = "Waiting...";
    this.cat.createCat({ name: data1, deptId: data2 })
      .subscribe(res => {
        console.log(res)
        if (res.status == 1) {
          this.cat.catList.push(res.data);
          this.categoryMsg = "New Category Added Successfully!";
        } else {
          this.categoryMsg = "Error! Category Not Added";
        }
        this.nameValue, this.deptValue = '';
        this.delay(1000).then(() => this.categoryMsg = '');
      });
  }

  addSkill(data, dept) {
    this.skillMsg = 'Waiting...';
    this.skil.createSkill({ name: data, deptId: dept }).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this.skil.skilList.push(res.data);
        this.skillMsg = "New Skill Added Successfully!";
      } else {
        this.skillMsg = "Error! Skill Not Added";
      }
    });
    this.nameValue = '';
    this.delay(3000).then(() => this.skillMsg = '');
  }
}
