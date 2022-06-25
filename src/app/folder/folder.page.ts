import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ValuesService } from '../values.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public entered_email:any;
  public entered_password:any;
  public students:any;
  public datas:any;
  public control:any;
  public myVal:any;
  public message:any;
  public realEmail:any;
  public temp: any;
  public someval: boolean;
  public messageSend:any;
  public daysSend: any;
  public obj: any;
  
  constructor(public http: HttpClient,public vals:ValuesService,public activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    // let dbSettings = JSON.parse(localStorage.getItem('Welcome-Info'));
    // let userSettings = JSON.parse(localStorage.getItem('USER-INFO'));

    // //Checks if there's a welcome message
    // if (dbSettings == null) {
    //   this.messageSend = 'Please get tested if you have symptoms of Covid-19';
    //   this.daysSend = '7';
    // }
    // else {
    //   this.messageSend = dbSettings.message;
    //   this.daysSend = dbSettings.test_period;
    // }

    // //Checks if there's any user info
    // if (userSettings == null) {
    //   this.entered_email = '';
    //   this.entered_password = '';
    // }
    // else {
    //   this.entered_email = userSettings.username;
    //   this.entered_password = userSettings.password;
    // }
  }

  ionViewWillEnter() {
    let dbSettings = JSON.parse(localStorage.getItem('Welcome-Info'));
    let userSettings = JSON.parse(localStorage.getItem('USER-INFO'));

    //Checks if there's a welcome message
    if (dbSettings == null) {
      this.messageSend = 'Please get tested if you have symptoms of Covid-19';
      this.daysSend = '7';
    }
    else {
      this.messageSend = dbSettings.message;
      this.daysSend = dbSettings.test_period;
    }

    //Checks if there's any user info
    if (userSettings == null) {
      this.entered_email = '';
      this.entered_password = '';
    }
    else {
      this.entered_email = userSettings.username;
      this.entered_password = userSettings.password;
    }
  }

  sendLoginInfo() {
    this.vals.GetLoginInfo(this.entered_email, this.entered_password);
  }

  signupPage() {
    this.router.navigate(['/detail-sign']);
  }
}
