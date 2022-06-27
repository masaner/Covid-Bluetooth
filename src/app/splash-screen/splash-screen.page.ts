import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(public vals: ValuesService, public router: Router) { 
  }

  ionViewWillEnter() {
    console.log('Initializing Splashscreen');
    console.log('Sending Request');
    setTimeout(() => {
      this.vals.GetSettings();
    }, 5000);
  }

  ngOnInit() {
  }

}
