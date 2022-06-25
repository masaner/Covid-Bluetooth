import { Component, enableProdMode, NgZone, OnInit } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface USERS {
  "device_id": string,
  "username": string,
  "password": string,
  "first_name": string,
  "last_name": string,
  "test_result": string,
  "test_date": Date,
  "degree": string,
  "course_1": boolean,
  "course_2": boolean,
  "course_3": boolean,
  "course_4": boolean,
  "course_5": boolean
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  devices: any[] = [];
  users: USERS[] = [];
  dataRecieved: string = "";
  
  device_id: string = "";
  username: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  testresult: string = "";
  testdate: string = "";
  degree: string = "";
  course1: string = "";
  course2: string = "";
  course3: string = "";
  course4: string = "";
  course5: string = "";

  pushNotificationToken: any;
  constructor(
    private ble: BLE,
    private backgroundMode: BackgroundMode,
    public http: HttpClient,
    private oneSignal: OneSignal,
    private ngZone: NgZone) 
  {
  }
  ionViewWillEnter() { //wont work on phone
    console.log('Initializing HomePage');
  }
  ionViewDidEnter() { //wont work on phone
    this.Scan();
  }
  ionViewDidLeave() {
    this.Scan();
    console.log('in background');
    this.backgroundMode.setDefaults({
      icon: './www/assets/icon/favicon.png',
      title: "Meric Test Title",
      text: "Meric Test Text!",
      color: "ffffff",
      hidden: false,
      bigText: true,
      resume: true
      });
  }
  Background() {
    this.backgroundMode.enable();
    this.backgroundMode.moveToBackground();
  }
  Scan() {
    this.devices = [];
    this.ble.scan([],15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }
 
  //   // Http.request({
  //   //   method: "GET",
  //   //   url: url,
  //   //   headers: { "Content-Type": "application/json" }
  //   // }).then((data) => {
  //   //   this.dataRecieved = JSON.stringify(data);
  //   // },(err) => {
  //   //   this.dataRecieved = JSON.stringify(err);
  //   // })
  //   // Http.request({
  //   //   method: "POST",
  //   //   url: url,
  //   //   headers: { "Content-Type": "application/json" },
  //   //   data:{'firstname':'test','lastname':'test2'}
  //   // }).then((data) => {
  //   //   this.dataRecieved = JSON.stringify(data);
  //   // },(err) => {
  //   //   this.dataRecieved = JSON.stringify(err);
  //   // })
  // }

  // getRequest() {
  //   let url = "https://covid-emu.herokuapp.com/users";
    
  //   this.http.get(url,
  //     {
  //       headers: new HttpHeaders(
  //         { "content-Type": "application/json" })
  //     }).subscribe((response) => {
        
  //       for (let key in response) {
  //         if (response.hasOwnProperty(key)) {
  //           let element = response[key];
  //           let singleData = { name: element.test_result, surname: element.test_date };
  //           let name = singleData.name;
  //           let lastname = singleData.surname;
  //           console.log(name + ' ' + lastname);
  //           localStorage.setItem("USER-INFO", JSON.stringify(singleData));
  //         }
  //       }
  
  //       // this.dataRecieved = JSON.stringify(response.valueOf('first_name'));
  //       // this.dataRecieved = response.valueOf(first_name).toString();
  //       //console.log(response);
  //       // console.log(JSON.stringify(response, null, 2));
  //       // const myObj = JSON.stringify(response, null, 2);
  //       // const myJSON = JSON.stringify(myObj);
  //       // localStorage.setItem("testJSON", myJSON);

  //       // console.log(JSON.stringify(response[0].first_name))
  //       // console.log(JSON.stringify(response[0].username))

  //       // console.log(JSON.stringify(response[1].first_name))
  //       // console.log(JSON.stringify(response[1].username))
  //     },(err) => {
  //       // this.dataRecieved = JSON.stringify(err);
  //       console.log(err);
  //     })
    

  //   // Http.request({
  //   //   method: "GET",
  //   //   url: url,
  //   //   headers: { "Content-Type": "application/json" }
  //   // }).then((data) => {
  //   //   this.dataRecieved = JSON.stringify(data);
  //   // },(err) => {
  //   //   this.dataRecieved = JSON.stringify(err);
  //   // })
  //   // Http.request({
  //   //   method: "POST",
  //   //   url: url,
  //   //   headers: { "Content-Type": "application/json" },
  //   //   data:{'firstname':'test','lastname':'test2'}
  //   // }).then((data) => {
  //   //   this.dataRecieved = JSON.stringify(data);
  //   // },(err) => {
  //   //   this.dataRecieved = JSON.stringify(err);
  //   // })
  // }


}

