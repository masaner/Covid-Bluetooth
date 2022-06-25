import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../values.service'; 
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login-continue',
  templateUrl: './login-continue.page.html',
  styleUrls: ['./login-continue.page.scss'],
})
export class LoginContinuePage implements OnInit {
  public postId: any;
  public datas: any;
  public sayfa1data: any;
  public sayfa2data: any;
  public sayfa3data: any;
  public sayfa4data: any;
  public email:any;
  public password:any;
  public name:any;
  public surname: any;
  public selectedcourses:any;
  public selected: any = [];
  // public isChecked: boolean;
  public courses: Array<any> = [
    { name: "CMPE-410", description: "course_1" , isChecked: false},
    { name: "CMPE-224", description: "course_2" , isChecked: false},
    { name: "CMPE-405", description: "course_3" , isChecked: false},
    { name: "CMSE-461", description: "course_4" , isChecked: false},
    { name: "CMPE-419", description: "course_5" , isChecked: false}
  ];
  public selectedCourses: Array<any> = [];
  public coursestest: Array<boolean> = [];

  constructor(public vals:ValuesService, private route: ActivatedRoute,private router: Router,public toastCtrl: ToastController) { }

  ngOnInit() {
    // this.email = this.route.snapshot.queryParamMap.get('username');
    // this.password = this.route.snapshot.queryParamMap.get('password');
    // this.name = this.route.snapshot.queryParamMap.get('first_name');
    // this.surname = this.route.snapshot.queryParamMap.get('last_name');
    
    // console.log(`email: ${this.email} - password: ${this.password} - name: ${this.name} - surname: ${this.surname}`);
  }
  ionViewWillEnter() {
    this.email = this.route.snapshot.queryParamMap.get('username');
    this.password = this.route.snapshot.queryParamMap.get('password');
    this.name = this.route.snapshot.queryParamMap.get('first_name');
    this.surname = this.route.snapshot.queryParamMap.get('last_name');
    
    console.log(`email: ${this.email} - password: ${this.password} - name: ${this.name} - surname: ${this.surname}`);
  }
  goBack() {
    this.router.navigate(['/detail-sign']);
  }
  
  async finishSignUp() {
    // console.log(this.courses); //hepsi geldi
    let i = 1;
    for (let each in this.courses) {
      let a = this.courses[each];
      // console.log(a.isChecked);
      i++;
      this.coursestest[i] = a.isChecked;
      // for (let i in this.courses){
      //   this.courses[i] = a.isChecked;
      // }
    }
    const toast = await this.toastCtrl.create({message:'Account Created !', duration:2000, color:'success',position:'top'});
    await toast.present();

    console.log(this.courses);
    
    
    this.sendEverything2();
  }
  // select(entry){
  //   if(entry.isChecked != true) {
  //     this.selected.push(entry);
  //   } 
  //   console.log(this.selected);
  // }
  sendEverything2() {
    // this.selectedCourses = this.selected;
    let data =
    {
        "device_id": null, //bluetooth
        "username": this.email,
        "password": this.password,
        "first_name": this.name,
        "last_name": this.surname,
        "degree": 3,
        "course_1": this.courses[0].isChecked,
        "course_2": this.courses[1].isChecked,
        "course_3": this.courses[2].isChecked,
        "course_4": this.courses[3].isChecked,
        "course_5": this.courses[4].isChecked,
    }
    //DEVICE ID
    //TEST RESULT
    //TEST DATE

    console.log(data);
    this.vals.CreateUser(data);
  }



}
