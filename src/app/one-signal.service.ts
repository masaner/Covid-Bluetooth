import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor() { }

  onInit():void {
    this.onLoad().then((OneSignal)=>{
      OneSignal.init({
        appId: "a6c295dd-e8e4-402f-b3ca-db911cd60d39",
      });
    })
  }

  async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }
}
