import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { NavigationService } from './services/core/navigation/navigation.service';
import { DeptService } from './services/dept/dept.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { TabHeadingDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchString: string;

  title = 'codexmatrix';
  company: String = "";

  action: String = 'Create';
  button: String = 'Submit';

  alerts: any[] = [];
  dismissible = true;

  departmentName: string = '';

  // start: number = 0;
  end: number = 10;
  // temp: number = 0;

  // pre: Boolean = true;
  // nxt: Boolean = false;

  value: number = 0;


  // prevData(data: number) {
  //   this.start -= this.temp;
  //   this.end -= this.temp;

  //   this.filterChecking(data);
  // }

  // nextData(data: number) {
  //   this.start += this.temp;
  //   this.end += this.temp;

  //   this.filterChecking(data);
  // }

  // filterChecking(data) {
  //   if (this.end <= data) {
  //     this.nxt = true;
  //   } else {
  //     this.nxt = false;
  //   }

  //   if (this.start <= 0) {
  //     this.pre = true;
  //   } else {
  //     this.pre = false;
  //   }
  // }

  filterRange(data: string) {
    this.value = parseInt(data, 10);
    // this.start = 0;
    this.end = this.value;
    // this.temp = this.end;
  }

  constructor(private router: Router, private nav: NavigationService,
    private dept: DeptService, public fAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.items = db.list('users/' + localStorage.getItem('id')).valueChanges();
    
    // this.dept.getDept()
  }

  user$: any;


  itemValue = '';
  items: Observable<any[]>;

  ngOnInit() {
    this.company = localStorage.getItem('companyName');

    // this.dept.getDept(localStorage.getItem('companyID'));



    this.end = 10;
    // this.temp = this.end;


    // console.log(this.fAuth.auth.currentUser.email);

    this.fAuth.user.subscribe(user => {
      if (user) {
        // console.log(user.uid);
        // console.log(user.email)
      }
    })

    this.db.object('users/name').valueChanges().subscribe(action =>{
      // console.log(action);
      if(action == "hamza"){
        // console.log(12)
      }
    })

    // console.log(this.db.object('users/'+ localStorage.getItem('id')).valueChanges())
    // this.db.list('users/' + localStorage.getItem('id')).valueChanges().subscribe(item => {
    //   console.log(item)
    // });
    // console.log(this.items$)

    // this.db.list('users/'+ localStorage.getItem('id')).valueChanges().subscribe(data =>{
    //   console.log(data)
    // })



    // this.db.database.ref('users').set({
    //   id: '1',
    //   name: 'hamza'
    // }).then((data) => {
    //   console.log(data)
    // })


  }

  reset() {
    this.action = 'Create';
    this.button = 'submit';
  }

}
