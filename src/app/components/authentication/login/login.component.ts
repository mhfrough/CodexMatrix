import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/core/navigation/navigation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { LoginReq } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  loginReq: LoginReq;
  isForm: boolean = true;
  isLoading: boolean = false;
  msg: boolean = false;
  authMsg: String = '';

  constructor(public nav: NavigationService, public router: Router,
    public _auth: AuthService, public fb: FormBuilder, public app: AppComponent
    , public fAuth: AngularFireAuth) {
    this.rForm = fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])]
    });
  }

  ngOnInit() {
    this.nav.hide();
    if (localStorage.getItem('loginStatus') == 'true') {
      // Redirect to Home Page
      this.router.navigate(['']);
    }
  }

  onSubmit(post) {
    console.log("authenticating...");
    this.authMsg = 'Authenticating...';
    this.isForm = false;
    this.isLoading = true;

    this.loginReq = {
      email: post.email,
      password: post.password,
      deviceType: 'none',
      deviceToken: 'none'
    }

    console.log(this.loginReq);
    this._auth.login(this.loginReq).subscribe(res => {
      if (res.status == 1) {
        this.login(post.email, post.password);
        this.isLoading = false;
        this.authMsg = `Welcome to ${res.data.companyName}`;
        console.log(res);
        localStorage.setItem('loginStatus', "true");
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('name', res.data.username);
        localStorage.setItem('mgr', res.data.mgrId);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('companyID', res.data.companyId);
        localStorage.setItem('companyName', res.data.companyName);
        if (res.data.domain == "IT")
          localStorage.setItem('domain', "sof");
        else
          localStorage.setItem('domain', "uni");
        this.delay(1000).then(any => {
          this.app.company = res.data.companyName;
          window.location.reload();
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

  async login(email, password) {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (r) {
        console.log(r);
      }

    } catch (e) {
      console.error();
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
