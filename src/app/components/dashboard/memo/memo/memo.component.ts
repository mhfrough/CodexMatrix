import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmpService } from 'src/app/services/emp/emp.service';
import { DeptService } from 'src/app/services/dept/dept.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {

  modalRef: BsModalRef;
  selectTrue: boolean = false;
  employee: string = '0';

  titleValue;
  bodyValue;

  today = new Date();

  notes: any = [{ body: 'loading notes...' }]
  readers: any = [{ employeeName: 'fetching viewers...' }];

  isReader: boolean = false;
  sendData: any;

  constructor(private modalService: BsModalService, public emp: EmpService,
    public dept: DeptService, private db: AngularFireDatabase, public router: Router,
    public app: AppComponent) {
    // Manager ID
    db.list('notes/9JU1uZdcU1yLpDEWdVKKdjlaJQCTEKaecl7m/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data) => {
      console.log(data)
      this.notes.splice(0);
      this.notes = data;
      if (this.notes.length == 0) {
        this.notes.push({ body: 'no new notes avaliable' })
      }
    });
  }

  ngOnInit() {
    this.dept.getDept(localStorage.getItem('companyID'));
    this.delay(3000).then(any => {
      this.oneForAll();
    })
  }

  read(data) {
    this.db.list('notes/' + localStorage.getItem('id') + '/' + data.key + '/readers').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((element) => {
      this.readers.splice(0);
      this.readers = element;
      if (this.readers.length == 0) {
        this.readers.push({ employeeName: 'none' })
      }

      for (let item of this.readers) {
        if (item.employeeID == localStorage.getItem('id')) {
          this.isReader = true
          break;
        }
      }

      this.sendData = {
        title: data.title,
        body: data.body,
        author: data.author,
        employee: data.employee,
        time: data.time,
        readers: this.readers[0].employeeName + " and " + (this.readers.length - 1) + " other(s)"
      }

      if (!this.isReader) {
        // Manager Id
        this.db.database.ref('notes/' + localStorage.getItem('id') + '/' + data.key + '/readers').push({
          employeeID: localStorage.getItem('id'),
          employeeName: localStorage.getItem('name') + "abc"
        }).then(any => {
          this.router.navigate(['/messages/memo-details', this.sendData]);
          this.app.messageNotificaitonUpdate();
        })
      } else {
        this.router.navigate(['/messages/memo-details', this.sendData]);
        this.app.messageNotificaitonUpdate();
      }

    });
  }

  note(title, body) {
    this.db.database.ref('notes/' + localStorage.getItem('id')).push({
      title: title,
      body: body,
      time: formatDate(this.today, 'dd MMM, yyyy', 'en-US', '+0530'),
      employee: this.employee,
      readers: {
        '-LX0R04hhhhhhhhBqnG': {
          employeeID: '',
          employeeName: ''
        }
      },
      author: localStorage.getItem('name') + "a"
    }).then(any => {
      this.modalRef.hide()
      this.app.messageNotificaitonUpdate();
    })
  }

  selectedEmployee = (data) => this.employee = data;
  selectEmployee = () => this.selectTrue = true;

  oneForAll() {
    for (let array of this.dept.deptList) {
      this.emp.getEmp(array.id, false);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
