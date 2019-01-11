import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation/navigation.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegisterReq, FireAuth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword');

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  isLoading: Boolean = false;
  registerReq: RegisterReq;
  fireAuth: FireAuth;
  isForm: Boolean = true;
  password: String = '';
  authMsg: String = '';
  isDisabled: Boolean = true;

  get cpwd() {
    return this.rForm.get('confirmPassword');
  }

  // , public fAuth: AngularFireAuth, public db: AngularFireDatabase
  constructor(public _nav: NavigationService, public auth: AuthService,
    public router: Router, public fb: FormBuilder, public app: AppComponent,
    public fAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.rForm = fb.group({
      'name': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(32)
      ])],
      'domain': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
      'confirmPassword': [null,
        Validators.compose([
          Validators.required,
          passwordConfirming,
          Validators.minLength(4),
          Validators.maxLength(32)
        ])]
    });
  }



  ngOnInit() {
    this._nav.hide();
    if (localStorage.getItem('loginStatus') == "true") {
      // Redirect to Home Page
      this.router.navigate(['']);
    }
  }

  onChange(data) {
    if (data == this.password) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;

    }
  }

  onSubmit(post) {
    console.log("registering...");
    this.authMsg = 'registering...';
    this.isForm = false;
    this.isLoading = true;



    this.registerReq = {
      name: post.name,
      email: post.email,
      domain: post.domain,
      password: post.password,
      deviceType: 'none',
      deviceToken: 'none'
    }

    this.auth.register(this.registerReq).subscribe(res => {
      if (res.status == 1) {
        console.log(res);

        this.register(res, post.password);
        // this.isLoading = false;
        this.authMsg = `${res.data.name} is registered`;

        localStorage.setItem('loginStatus', "true");
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('companyID', res.data.companyId);
        localStorage.setItem('companyName', res.data.name);
        this.delay(1000).then(any => {
          this.app.company = res.data.name;
          this.router.navigate(['']);
        });
      } else {
        this.isLoading = false;
        this.authMsg = res.message;

        this.delay(2000).then(any => {
          this.authMsg = '';
          this.isForm = true;
        });
      }
    });
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
        this.db.database.ref('users/'+res.data.id).set({
          name: res.data.name,
          email: res.data.email
        }).then(data => {
          this.isLoading = false;
        })
      }

    } catch (e) {
      console.error(e);
    }
  }



  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
}

