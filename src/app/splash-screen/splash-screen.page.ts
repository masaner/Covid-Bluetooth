import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ValuesService } from '../values.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(public vals: ValuesService, public router: Router) { 
    console.log('Initializing Splashscreen');
    console.log('Sending Request');
    setTimeout(() => {
      this.vals.GetSettings();
    }, 5000);
  }
  
  ionViewWillEnter() {
    
  }

  ngOnInit() {
    
  }

}
