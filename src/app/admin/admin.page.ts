import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  
  public message: any;
  public days: any;

  public email:any;
  public password:any;
  public name:any;
  public surname:any;
  constructor(private route:ActivatedRoute,public vals:ValuesService,private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.email = this.route.snapshot.queryParamMap.get('emailFinal');
    this.password = this.route.snapshot.queryParamMap.get('passwordFinal');

    this.name = this.route.snapshot.queryParamMap.get('nameFinal');
    this.surname = this.route.snapshot.queryParamMap.get('surnameFinal');
    let userInfo = JSON.parse(localStorage.getItem('USER-INFO'));
    //Checks if there's a test result saved
    if (userInfo == null) {
      return;
    }
    else {
      this.name = userInfo.first_name;
      this.surname = userInfo.last_name;
    }
  }

  modifySettings() {
    console.log(this.message + '  ' + this.days);
    this.vals.UpdateSettings(this.message,this.days);
  }

  goBack() {
    setTimeout(() => {
      this.router.navigate(['/folder']);
    }, 500);
  }

}
