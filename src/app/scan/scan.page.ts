import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ValuesService } from '../values.service'; 


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  public status:any;
  public date: any;
  public lastdate: any;
  public mydate: String = new Date().toISOString();

  
  constructor(private router: Router,public vals:ValuesService) { }

  ngOnInit() {
    // let testInfo = JSON.parse(localStorage.getItem('Test-Info'));
    // //Checks if there is a welcome message
    // if (testInfo == null) {
    //   this.lastdate = null;
    // }
    // else {
    //   this.lastdate = testInfo.test_date;
    //   this.status = testInfo.test_result;
    // }

  }
  ionViewWillEnter() {
    let testInfo = JSON.parse(localStorage.getItem('Test-Info'));
    //Checks if there is a welcome message
    if (testInfo == null) {
      this.lastdate = null;
    }
    else {
      this.lastdate = testInfo.test_date;
      this.status = testInfo.test_result;
    }

  }
  save() {
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    let deviceInfo = localStorage.getItem('deviceID');
    let data =
    {
        "device_id": deviceInfo, //bluetooth Can change
        "username": userInfo.username,
        "password": userInfo.password,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name,
        "degree": userInfo.degree,
        "test_date": this.mydate.split('T')[0],
        "test_result": this.status,
        "course_1": userInfo.course_1,  //Can change
        "course_2": userInfo.course_2,  //Can change
        "course_3": userInfo.course_3,  //Can change
        "course_4": userInfo.course_4,  //Can change
        "course_5": userInfo.course_5,  //Can change
    }
    this.vals.UpdateUser(data,userInfo.username);
  }
  back() {
    setTimeout(() => {
      this.router.navigate(['/staff']);
    }, 500);
  }

}
