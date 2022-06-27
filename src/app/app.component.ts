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
  savedDevices: any[] = [];
  cleanedDevices: any[] = [];
  indexesToDelete: any[] = [];
  test_period: any;
  mydeviceid: any;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
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
      this.platform.backButton.subscribeWithPriority(0, () => {
        console.log();
      });
    });
  }
  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay,
    );
  }
  cleanContactList() {
    this.savedDevices = JSON.parse(localStorage.getItem('closeContact'));
    if (this.savedDevices !== null) {
      for (let key in this.savedDevices) {
        if (this.savedDevices.hasOwnProperty(key)) {
          let element = this.savedDevices[key];
          let date = new Date(element.date);
          let dateDiff: Number = this.getDayDiff(new Date(), date);
          let adminDate: Number = this.test_period;
          if (dateDiff > adminDate)
          {
            //must remove id from list
            var index = this.savedDevices.findIndex(obj => obj.id==element.id);
            this.indexesToDelete.push(index);
            continue;
          }
          else if (dateDiff < adminDate){continue;}
          else if (dateDiff === adminDate){continue;}
        }
      }
      for (let key in this.indexesToDelete) {
        delete this.savedDevices[this.indexesToDelete[key]];
      }
      localStorage.removeItem('closeContact');
      this.savedDevices.forEach((element) => {
        if (element !== null) {
          this.cleanedDevices.push(element);
        }
      });
      localStorage.setItem('closeContact', JSON.stringify(this.cleanedDevices));
    }
  }
  ngOnInit() {
    OneSignal.getDeviceState(function(jsonData) {
      console.log(jsonData);
      let mydeviceid = jsonData.userId;
      localStorage.setItem('deviceID', mydeviceid);
    });

    let dbSettings = JSON.parse(localStorage.getItem('Welcome-Info'));
    this.test_period = dbSettings.test_period;
    this.cleanContactList();
    this.backgroundMode.enable();
    setTimeout(() => {
      this.ble.startScan([]).subscribe(
        device => this.onDeviceDiscovered(device)
      );
    }, 2000);
  }
  onDeviceDiscovered(device) {
    let initialDate: String = new Date().toISOString();
    let date = initialDate.split('T')[0];
    delete device.advertising;
    delete device.name;
    let deviceID: String = device.id;
    let rssiVal: Number = device.rssi;
    let resistanceVal: Number = -50; 
    console.log(deviceID + ' ' + rssiVal);
    if (rssiVal < resistanceVal) {
      //NOT CLOSE ENOUGH
      console.log('FAR');
    }
    else {
      //REALLY CLOSE
      console.log('CLOSE');

      let dateInfo = { date: date };
      var mergedObj = { ...device, ...dateInfo };

      this.ngZone.run(() => {
        if (this.contains(this.cleanedDevices, "id", mergedObj)) {
          console.log('has it');
        }
        else {
          console.log('doesnt have it');
          this.cleanedDevices.push(mergedObj)
          //WE NEED TO SEND INFO TO DB TO FIND WHICH ID WE FOUND
          localStorage.setItem('closeContact', JSON.stringify(this.cleanedDevices));
        }
      })
    }
  }
  contains(arr, key, mergedObj) {
    let val = mergedObj.id;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) {
        return true;
      }
    }
    console.log('Nope! Add it!');
    return false;
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
}
