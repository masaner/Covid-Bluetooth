import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValuesService } from '../values.service'; 


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  public status: any;
  public date:any;
  public passed: string;
  public userInfo: any;

  public email:any;
  public password:any;
  public name:any;
  public surname:any;
  public datas: any;

  public students: Array<any> = [];
  public course: string;
  constructor(private router: Router,private route:ActivatedRoute,public vals:ValuesService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    var mydata = localStorage.getItem("positiveStudents");
    if (userInfo == null) {
      this.name = 'Staff';
      this.surname = 'Member';
    }
    else {
      this.name = userInfo.first_name;
      this.surname = userInfo.last_name;
    }
    this.students = JSON.parse(mydata);
    localStorage.removeItem("positiveStudents");
  }
  back() {
      this.router.navigate(['/staff']);
  }

}
