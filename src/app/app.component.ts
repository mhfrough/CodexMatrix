import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';
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


  notification: any;
  public notificaitonMessages = [];
  memo: number = 0;
  message: number = 0;

  isSoftwareHouse: boolean = false;


  constructor(public fAuth: AngularFireAuth, private db: AngularFireDatabase,
    public router: Router, private _pushNotificationService: PushNotificationService) {
    // db.list('users/VqrqEkgaXe3RNWXI8zzSsobqhiTdEZ4hylED/notificaiton/').valueChanges().subscribe((data) => {
    //   this.notification = data
    //   this.notificaitonMessages.splice(0);
    //   const ide = this.db.createPushId();
    //   console.log(ide)
    //   for(let item of this.notification){
    //     console.log(data)
    //     if(item.status == "un-read"){
    //       this.notificaitonMessages.push(item);
    //     }
    //   }

    //   console.log(this.notificaitonMessages)
    // });

    db.list('users/' + localStorage.getItem('id') + '/notificaiton/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data) => {
      this.notification = data
      this.notificaitonMessages.splice(0);
      for (let item of this.notification) {
        if (item.status == "un-read") {
          this.notificaitonMessages.push(item);
        }
      }

      this.notificaitonMessages.forEach(element => {
        this.pushNotification(element.title, element.message)
      })
    });
    this.messageNotificaitonUpdate();
  }

  messageNotificaitonUpdate() {
    this.memo = 0;
    // Memo
    // Manager ID
    this.db.list('notes/9JU1uZdcU1yLpDEWdVKKdjlaJQCTEKaecl7m/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data: any) => {
      console.log('hello')
      // Manager ID
      for (let key of data) {
        this.db.list('notes/' + localStorage.getItem('id') + '/' + key.key + '/readers').snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe((element: any) => {
          console.log('hi')
          let count = 0;
          for (let item of element) {
            if (item.employeeID == localStorage.getItem('id')) {
              count = count + 1;
            }
          }
          if (count == 0) {
            console.log(true)
            this.memo = this.memo + 1;
          }
        });
      }
    });
  }

  onRead(data) {
    this.db.database.ref('users/' + localStorage.getItem('id') + '/notificaiton/' + data).update({
      status: "read"
    })
  }

  onView(data, read) {
    this.onRead(read);
    this.router.navigate(['/project/' + data]);
  }


  ngOnInit() {
    this.company = localStorage.getItem('companyName');
    if (localStorage.getItem('sof')) this.isSoftwareHouse = true;
    else this.isSoftwareHouse = false;
    this._pushNotificationService.requestPermission();

    // this.delay(10000).then(() => {
    //   console.log(this.profile)

    //   for(let item of this.profile){
    //     console.log(item.status)
    //   }
    // })

    // this.getItem().snapshotChanges().pipe(
    //   map(changes => {
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   })
    // ).subscribe(res => {
    //   console.log(res)
    // })

    // this.getItem().snapshotChanges().subscribe(res => {
    //   console.log(res)
    //   this.employeeList = [];
    //   res.forEach(element => {
    //     console.log(element)
    //     let x = element.payload.toJSON();
    //     x = element.key;
    //     console.log(x)
    //     this.employeeList.push(x);
    //   });
    // })

    // this.getItem().snapshotChanges().pipe(
    //   map(res => {
    //     res.map(a => {
    //       let g;
    //       g.key = a.payload.key;

    //       let p = []
    //       a.payload.val().p.array.forEach(element => {
    //         p.push(element)
    //       });

    //       g.p = p;

    //       console.log(g)
    //     })
    //   })
    // )


    // this.delay(10000).then(()=>{
    //   console.log(this.employeeList)
    // })


    // this.dept.getDept(localStorage.getItem('companyID'));

    // this.end = 10;
    // this.temp = this.end;

    // VqrqEkgaXe3RNWXI8zzSsobqhiTdEZ4hylED test employee for notification

    // this.db.object('users/VqrqEkgaXe3RNWXI8zzSsobqhiTdEZ4hylED/notificaiton/')
    //   .valueChanges().subscribe(action => {
    //     if (action) {
    //       // this.items = this.db.list('users/VqrqEkgaXe3RNWXI8zzSsobqhiTdEZ4hylED/notificaiton/')

    //       console.log(action)


    //       // console.log("break")
    //       // console.log(this.items)

    //       // let str = JSON.stringify(action);
    //       // for (let i = 0; i < str.length; i++) {
    //       //   console.log("ele:  " + str[i]);
    //       // }
    //       // console.log(str);
    //       // Object.keys(JSON.parse(str)).map(res => {
    //       // console.log(res)
    //       // console.log(JSON.parse(res))
    //       // })



    //     }
    //   })


    // console.log(this.fAuth.auth.currentUser.email);

    // this.fAuth.user.subscribe(user => {
    //   if (user) {
    //     console.log(user.uid);
    //     console.log(user.email)
    //   }
    // })

    // this.db.object('users/' + localStorage.getItem('id') + '/name').valueChanges().subscribe(action => {
    //   console.log(action);
    //   console.log('users/' + localStorage.getItem('id') + '/name')
    //   if (action == "SolveProblems") {
    //     console.log(12)
    //   }
    // })




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


  pushNotification(heading, message) {
    const title = heading;
    const options = new PushNotificationOptions();
    options.body = message;
    options.icon = 'src/assets/images/logo.png';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 5000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
      (err) => {
        console.log(err);
      });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  reset() {
    this.action = 'Create';
    this.button = 'submit';
  }

}
