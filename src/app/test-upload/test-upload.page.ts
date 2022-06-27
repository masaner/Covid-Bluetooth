import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.page.html',
  styleUrls: ['./test-upload.page.scss'],
})
export class TestUploadPage implements OnInit {

  public device_id: any;
  public email: any;
  public password: any;
  public name: any;
  public surname: any;
  public status:any;
  public lastdate: any;
  public dateFormat: any;
  public c1: any;
  public c2: any;
  public c3: any;
  public c4: any;
  public c5: any;
  public degree: any;
  public mydate: String = new Date().toISOString();
  constructor(private router: Router,private route: ActivatedRoute,public vals:ValuesService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    let testInfo = JSON.parse(localStorage.getItem('Test-Info'));

    //Checks if there's a test result saved
    if (userInfo == null) {
      return;
    }
    else {
      if (testInfo == null) {
        this.status = userInfo.test_result;
        this.lastdate = userInfo.test_date.split('T')[0]; 
      }
      else {
        this.status = testInfo.test_result;
        this.lastdate = testInfo.test_date.split('T')[0]; 
      }
      this.name = userInfo.first_name;
      this.surname = userInfo.last_name;
      this.c1 = this.route.snapshot.queryParamMap.get('c1');
      this.c2 = this.route.snapshot.queryParamMap.get('c2');
      this.c3 = this.route.snapshot.queryParamMap.get('c3');
      this.c4 = this.route.snapshot.queryParamMap.get('c4');
      this.c5 = this.route.snapshot.queryParamMap.get('c5');
    }
  }
  save() {
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    let c1 = this.c1 === 'true';
    let c2 = this.c2 === 'true';
    let c3 = this.c3 === 'true';
    let c4 = this.c4 === 'true';
    let c5 = this.c5 === 'true';
    let data =
    {
        "device_id": null, //bluetooth Can change
        "username": userInfo.username,
        "password": userInfo.password,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name,
        "degree": userInfo.degree,
        "test_date": this.mydate.split('T')[0],
        "test_result": this.status,
        "course_1": c1,  //Can change
        "course_2": c2,  //Can change
        "course_3": c3,  //Can change
        "course_4": c4,  //Can change
        "course_5": c5,  //Can change
    }
    this.vals.UpdateUser(data, userInfo.username);
  }
  
  goBack() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
