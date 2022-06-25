import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public students:any;
  public datas:any;
  public passed:any;
  public mydate:any;
  public status:any;
  public date: any;
  public device_id: any;
  public email: any;
  public name: any;
  public surname: any;
  public password: any;
  public courses: Array<any> = [
    { name: "CMPE-411", description: "course_1" , isChecked: false},
    { name: "CMPE-224", description: "course_2" , isChecked: false},
    { name: "CMPE-405", description: "course_3" , isChecked: false},
    { name: "CMSE-461", description: "course_4" , isChecked: false},
    { name: "CMPE-419", description: "course_5" , isChecked: false}
  ];
  

  constructor(public vals:ValuesService,private route: ActivatedRoute, public toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    // console.log("entered again")
    // let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    // let testInfo = JSON.parse(localStorage.getItem('Test-Info'));
    
    // //Checks if there's a test result saved
    // if (userInfo == null) {
    //   return;
    // }
    // else {
    //   if (testInfo == null) {
    //     this.status = userInfo.test_result;
    //     this.date = userInfo.test_date.split('T')[0]; 
    //   }
    //   else {
    //     this.status = testInfo.test_result;
    //     this.date = testInfo.test_date.split('T')[0]; 
    //   }
    //   this.name = userInfo.first_name;
    //   this.surname = userInfo.last_name;
    //   this.courses[0].isChecked = userInfo.course_1;
    //   this.courses[1].isChecked = userInfo.course_2;
    //   this.courses[2].isChecked = userInfo.course_3;
    //   this.courses[3].isChecked = userInfo.course_4;
    //   this.courses[4].isChecked = userInfo.course_5;
    // }
  }
  ionViewWillEnter() {
    console.log("entered again")
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    let testInfo = JSON.parse(localStorage.getItem('Test-Info'));
    
    //Checks if there's a test result saved
    if (userInfo == null) {
      return;
    }
    else {
      if (testInfo == null) {
        this.status = userInfo.test_result;
        this.date = userInfo.test_date.split('T')[0]; 
      }
      else {
        this.status = testInfo.test_result;
        this.date = testInfo.test_date.split('T')[0]; 
      }
      this.name = userInfo.first_name;
      this.surname = userInfo.last_name;
      this.courses[0].isChecked = userInfo.course_1;
      this.courses[1].isChecked = userInfo.course_2;
      this.courses[2].isChecked = userInfo.course_3;
      this.courses[3].isChecked = userInfo.course_4;
      this.courses[4].isChecked = userInfo.course_5;
    }
  }
  goBack() {
    setTimeout(() => {
      this.router.navigate(['/folder']);
    }, 500);
  }

  modifyTestResult() {
    let params: NavigationExtras = {
      queryParams: {
        c1: this.courses[0].isChecked,
        c2: this.courses[1].isChecked,
        c3: this.courses[2].isChecked,
        c4: this.courses[3].isChecked,
        c5: this.courses[4].isChecked
      },
    };
    setTimeout(() => {
      this.router.navigate(['/test-upload'], params);
    }, 1000);
  }

}
