import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ValuesService } from '../values.service'; 
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-detail-sign',
  templateUrl: './detail-sign.page.html',
  styleUrls: ['./detail-sign.page.scss'],
})
export class DetailSignPage implements OnInit {

  public email:any;
  public password:any;
  public name:any;
  public surname: any;
  
  constructor(public vals: ValuesService, private router: Router, public toastCtrl: ToastController) { 
  }
  ngOnInit() {
    
  }
  goBack() {
    this.router.navigate(['/folder']);
  }

  async signupStep2() {
    let info = await this.checkInfo();
    if (!info) {
      return;
    }
    let params: NavigationExtras = {
      queryParams: {
        username: this.email,
        password: this.password,
        first_name: this.name,
        last_name: this.surname
      },
    };
    this.router.navigate(['/login-continue'], params);
  }

  async checkInfo() {
    if (this.email == null || this.password == null || this.name == null || this.surname == null) {
      console.log("Please Enter Values");
      const toast = this.toastCtrl.create({message:'Please fill in all of the required fields', duration:2000, color:'danger',position:'top'});
      (await toast).present();
      return false;
    }
    else { return true; }
  }
  
}
