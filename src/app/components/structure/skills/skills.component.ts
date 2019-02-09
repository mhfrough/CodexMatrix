import { Component, OnInit } from '@angular/core';
import { SkilReq, SkilDel } from 'src/app/interfaces/skil';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AppComponent } from 'src/app/app.component';
import { SkilService } from 'src/app/services/skil/skil.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skilReq: SkilReq;
  skilDel: SkilDel;
  public searchString: string;

  rForm: FormGroup;
  alerts: any[] = [];
  isUpdate: boolean = false;
  isLoading: boolean = false;
  temp: any;

  constructor(public dept: DeptService, public app: AppComponent,
    public skil: SkilService, public fb: FormBuilder) {
    this.rForm = fb.group({
      'skillName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)
      ])],
      'deptName': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
    this.app.reset();

    this.delay(3000).then(any => {

      this.oneForAll();
      console.log(this.skil.skilList)

    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  oneForAll() {
    for (let array of this.dept.deptList) {
      this.skil.getSkill(array.id);
    }
  }

  sortName() {
    this.skil.skilList = this.skil.skilList.sort((a, b) => 0 - (a.name.rendered > b.name.rendered ? -1 : 1));
  }

  sortDesc() {
    this.skil.skilList = this.skil.skilList.sort((a, b) => 0 - (a > b ? -1 : 1));
  }

  sortAsc() {
    this.skil.skilList = this.skil.skilList.sort((a, b) => 0 - (a > b ? 1 : 1));
  }

  onChange(data) {
    if (data == "1") {
      this.oneForAll();
    } else {
      this.temp = data;
      this.skil.getSkill(data);
    }
  }

  onSubmit(post) {
    // this.isLoading = true;

    if (!this.isUpdate) {
      this.skilReq = {
        name: post.skillName,
        deptId: post.deptName
      }

      this.skil.createSkill(this.skilReq).subscribe(res => {
        // console.log(res);
        if (res.status == 1) {
          // this.isLoading = false;
          // console.log(res);
          this.app.alerts.push({
            type: 'success',
            icon: 'done',
            msg: `${res.message}`,
            timeout: 5000
          });

          this.skil.skilList.push(res.data)
        } else {
          // this.isLoading = false;
          this.app.alerts.push({
            type: 'warning',
            icon: 'warning',
            msg: `${res.message}`,
            timeout: 5000
          });
        }
      })
    } else {

    }

    this.rForm.reset();
    this.app.reset();

  }

  

  onDelete(id: String) {
    // console.log(id);
    // this.isLoading = true;
    this.skilDel = {
      skillId: id
    }

    console.log(this.skilDel);
    this.skil.deleteSkill(this.skilDel).subscribe(res => {
      // Sill Deleted
      // console.log(res);
      // this.isLoading = false;
      this.app.alerts.push({
        type: 'danger',
        icon: 'report',
        msg: `${res.message}`,
        timeout: 5000
      });

      
      this.skil.skilList = this.skil.skilList.filter(skil => skil.id !== id);

    });

    this.rForm.reset();
    this.app.reset();

  }

}
