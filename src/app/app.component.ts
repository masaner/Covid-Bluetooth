import { Component, OnInit, NgZone } from '@angular/core';

import { Platform,AlertController, ToastController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { OneSignalService } from './one-signal.service';
import OneSignal from 'onesignal-cordova-plugin';

import { BLE } from '@ionic-native/ble/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'OneSignal-Angular';
  devices: any[] = [];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private os: OneSignalService,
    public toastCtrl: ToastController,
    private splashScreen: SplashScreen,
    private ble: BLE,
    private backgroundMode: BackgroundMode,
    private ngZone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.OneSignalInit();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  async sendAlert(msg) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000, color: 'danger', position: 'top' });
    await toast.present();
  }

  ngOnInit() {
    this.backgroundMode.enable();
    this.devices = [];
      this.ble.startScan([]).subscribe(
        device => this.onDeviceDiscovered(device)
      );
    
  }
  onDeviceDiscovered(device) {
    let newDate = Date.now();
    console.log(newDate);
    console.log(newDate.toString());

    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
    localStorage.setItem('closeContact', JSON.stringify(this.devices));
  }
      
  OneSignalInit() {
      // Uncomment to set OneSignal device logging to VERBOSE  
      // OneSignal.setLogLevel(6, 0);
      // NOTE: Update the setAppId value below with your OneSignal AppId.
      OneSignal.setAppId("A6C295DD-E8E4-402F-B3CA-DB911CD60D39");
      OneSignal.setNotificationOpenedHandler(function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });
    
      // iOS - Prompts the user for notification permissions.
      //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
      OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
          console.log("User accepted notifications: " + accepted);
      });
  }

  setupPush() {
    // // I recommend to put these into your environment.ts
    // this.oneSignal.startInit('e6d7967c-18a3-4425-85a9-30f37023b939', 'io.ionic.starter');
 
    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // // Notifcation was received in general
    // this.oneSignal.handleNotificationReceived().subscribe(data => {
    //   let msg = data.payload.body;
    //   let title = data.payload.title;
    //   let additionalData = data.payload.additionalData;
    //   this.showAlert(title, msg, additionalData.task);
    //   console.log("INFO: " + msg);
    //   console.log("INFO2: " + title);
    //   console.log("INFO3: " + additionalData);
    //   this.sendAlert(msg);
    // });
 
    // // Notification was really clicked/opened
    // this.oneSignal.handleNotificationOpened().subscribe(data => {
    //   // Just a note that the data is a different place here!
    //   let additionalData = data.notification.payload.additionalData;

    //   console.log("INFO3: " + additionalData);
    //   console.log("INFO3: " + additionalData.task);

    //   this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    // });
 
    // this.oneSignal.endInit();
  }
 
  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
