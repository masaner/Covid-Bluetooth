import { Component, OnInit} from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ValuesService } from '../values.service'; 


interface USERS {
  "device_id": string, //bluetooth
  "username": string,
  "password": string,
  "first_name": string,
  "last_name": string,
  "test_result": string,
  "test_date": Date,
  "degree": string,
  "course_1": boolean,
  "course_2": boolean,
  "course_3": boolean,
  "course_4": boolean,
  "course_5": boolean
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {
  public status: any;
  public date:any;
  public passed: string;
  public userInfo: any;

  public username:any;
  public password:any;
  public name:any;
  public surname: any;
  
  course: string;
  public courses: Array<any> = [
    { name: "CMPE-411", description: "course_1" , isChecked: false},
    { name: "CMPE-224", description: "course_2" , isChecked: false},
    { name: "CMPE-405", description: "course_3" , isChecked: false},
    { name: "CMSE-461", description: "course_4" , isChecked: false},
    { name: "CMPE-419", description: "course_5" , isChecked: false}
  ];

  constructor(public activatedRoute: ActivatedRoute, private route: ActivatedRoute, private router: Router,public vals:ValuesService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.status = this.route.snapshot.queryParamMap.get('test_result');
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    let testInfo = JSON.parse(localStorage.getItem('Test-Info'));

    if (testInfo !== null) {
      this.date = testInfo.test_date
      this.status = testInfo.test_result;
    }
    if (userInfo !== null && testInfo == null) {}
    {
      this.name = userInfo.first_name;
      this.surname = userInfo.last_name;
      this.date = userInfo.test_date
      this.status = userInfo.test_result;
      this.courses[0].isChecked = userInfo.course_1;
      this.courses[1].isChecked = userInfo.course_2;
      this.courses[2].isChecked = userInfo.course_3;
      this.courses[3].isChecked = userInfo.course_4;
      this.courses[4].isChecked = userInfo.course_5;

      if (this.courses[0])
      {
        this.course = 'c1';
      }
      else if (this.courses[1])
      {
        this.course = 'c2';
      }
      else if (this.courses[2])
      {
        this.course = 'c3';
      }
      else if (this.courses[3])
      {
        this.course = 'c4';
      }
      else if (this.courses[4])
      {
        this.course = 'c5';
      }
    }
  }
  goBack() {
    setTimeout(() => {
      this.router.navigate(['/folder']);
    }, 500);
  }
  goScan() {
    setTimeout(() => {
      this.router.navigate(['/scan']);
    }, 1000);
  }
  goStudentList() {  //get positive students and go to student-list
    let myCourse:string;
    if(this.courses[0].isChecked){
      myCourse = 'c1';
    }
    if(this.courses[1].isChecked){
      myCourse = 'c2';
    }
    if(this.courses[2].isChecked){
      myCourse = 'c3';
    }
    if(this.courses[3].isChecked){
      myCourse = 'c4';
    }
    if(this.courses[4].isChecked){
      myCourse = 'c5';
    }
    this.vals.GetMyStudents(myCourse);
  }
  goStudentList2() {
    let params: NavigationExtras = {
      queryParams: {
        course: this.course,
      },
    };
    console.log('request info: ' + this.course);
    console.log('request info2: ' + params);

    setTimeout(() => {
      this.router.navigate(['/student-list'], params);
    }, 1000);
  }
}
