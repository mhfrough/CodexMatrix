import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EmpReq, EmpPut, EmpDel } from 'src/app/interfaces/emp';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from 'src/app/services/emp/emp.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { DesigService } from 'src/app/services/desig/desig.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { ActivatedRoute } from '@angular/router';
import { SkilService } from 'src/app/services/skil/skil.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FireAuth } from 'src/app/interfaces/auth';

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

  selectedSkills = [];
  public item = [];
  public items = [];

  id: String = "";
  empName: String = "";
  empEmail: String = "";
  empPassword: String = "";
  empDept: String = "";
  empMgr: String = "";
  isUpdate: boolean = false;
  imageSrc: string = "/src/assets/images/empty.png";
  fieldsDisabled: boolean = false;
  userImage: File;
  fireAuth: FireAuth;
  alerts: any[] = [];
  isLoading: boolean = false;

  user$: Object;

  message: any = {
    id: '',
    name: '',
    email: ''
  }

  constructor(public emp: EmpService, public dept: DeptService,
    public rol: RolService, public desig: DesigService,
    public app: AppComponent, public fb: FormBuilder, public skil: SkilService,
    private route: ActivatedRoute, public fAuth: AngularFireAuth, private db: AngularFireDatabase) {
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
    this.rol.getRole();
    this.dept.getDept(localStorage.getItem('companyID'));
    this.desig.getDesig(localStorage.getItem('companyID'));

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
    this.skil.getSkill(data);
    this.delay(3000).then(any => {
      console.log(2)
      this.items = this.skil.skilList;
      console.log(this.items)
    });
  }

  onChange(data) {
    console.log(data)

    this.emp.getEmp(data, false);

  }

  onSubmit(post) {
    this.isLoading = true;
    //  let fd = new FormData();
    //  fd.append('image', this.selectedFile ,this.selectedFile.name)
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    console.log(formData);

    //  console.log(fd.get('image'))
    //  console.log(this.selectedFile)
    //  console.log(this.selectedFile.name)

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
        skills: this.selectedSkills.toString(),
        image: formData
      }

      console.log(this.empReq);

      this.emp.createEmp(this.empReq).subscribe(res => {
        console.log(res)
        if (res.status == 1) {
          this.register(res, post.empPassword).then(() => {
            this.isLoading = false;
          });
          console.log(res);
          this.app.alerts.push({
            type: 'success',
            icon: 'priority_high',
            msg: `${res.message}`,
            timeout: 5000
          });

          this.message.id = res.data.id;
          this.message.name = res.data.name;
          this.message.email = res.data.email;

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
          this.app.alerts.push({
            type: 'info',
            icon: 'priority_high',
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
    }

    this.rForm.reset();
    this.selectedSkills.splice(0);
    this.items.splice(0);
    this.imageSrc = "/src/assets/images/empty.png";

  }

  async register(res, password) {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        res.data.email,
        password
      );
      if (r) {

        this.fireAuth = {
          id: res.data.id
        }
        console.log(r);
        // this.db.database.ref('status/' + res.data.id).push({

        // }).then(() => {
        this.db.database.ref(localStorage.getItem('companyID') + '/users/' + res.data.id).set({
          name: res.data.name,
          email: res.data.email,
          manager: res.data.mgr,
          status: "Available"
        }).then(data => {
          this.isLoading = false;
        })
        // })
      }

    } catch (e) {
      console.error(e);
    }
  }

  selectedFile: File = null;

  readURL(event) {
    this.userImage = event.target.files[0];
    // this.imageSelected = this.userFile.name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.selectedFile = <File>event.target.files[0];

    console.log(event)
    // this.selectedFile = event.item(0);
    // console.log(this.selectedFile)
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

  onAdd(data) {
    console.log(data.id)
    this.selectedSkills.push(data.id.toString());
    console.log(this.selectedSkills.toLocaleString());
    console.log(this.selectedSkills);
  }

  onRemove(data) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(data), 1);
    console.log(this.selectedSkills.toLocaleString());
    console.log(this.selectedSkills);
  }

  // Pop-up Models

  nameValue;
  departmentMsg: string = '';
  designationMsg: string = '';
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
      });

    this.nameValue = null;
    this.delay(3000).then(() => this.departmentMsg = '');
  }

  addDesignation(data) {
    this.designationMsg = "Waiting...";
    this.desig.createDesig({ name: data, companyId: localStorage.getItem('companyID') })
      .subscribe(res => {
        console.log(res)
        if (res.status == 1) {
          this.desig.desigList.push(res.data);
          this.designationMsg = "New Designation Added Successfully!";
        } else {
          this.designationMsg = "Error! Designation Not Added";
        }
      });

    this.delay(3000).then(() => this.designationMsg = '');
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
