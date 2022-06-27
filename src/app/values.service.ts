import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  
export class ValuesService {
  email: any;
  dataRecieved: string = "";
  dataRecieved2: any;

  check: boolean;
  check2: boolean;
  userVeri: Object;

	device_id: any;
	username: any;
	password: any;
	firstname: any;
	lastname: any;
  testresult: any;
	testdate: any;
	degree: any;
  c1: any;
	c2: any;
	c3: any;
	c4: any;
  c5: any;

  first_name  :any;
	last_name   :any;
  course_1    :any;
  course_2    :any;
  course_3    :any;
  course_4    :any;
  course_5    :any;
  test_date   :any;
  test_result :any;
  //SETTINGS
  appDays: any;
  appMessage: any;

  positiveStudents: Array<any> = [];

  getHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      //Authorization: "Bearer " + this.token
    });
  }
  
  constructor(public http: HttpClient, public toastCtrl: ToastController, private router: Router) { }
  
  //TESTED
  GetLoginInfo(param1, param2) {
    let deviceID = localStorage.getItem('deviceID');
    let url = "https://covid-emu.herokuapp.com/users/";
    this.http.get(url + param1, { headers: this.getHeaders() }).subscribe
    (async (response) => {
      if (typeof (response[0]) == "undefined") {
        console.log('no user');
        const toast = await this.toastCtrl.create({message:'INCORRECT E-MAIL OR PASSWORD', duration:2000, color:'danger',position:'top'});
        await toast.present();
      }
      for (let key in response) {
        if (response.hasOwnProperty(key)) {

          let element = response[key];
          let person = {
            device_id: deviceID, username: element.username, password: element.password, first_name: element.first_name,
            last_name: element.last_name, degree: element.degree, test_result: element.test_result, test_date: element.test_date,
            course_1: element.course_1, course_2: element.course_2, course_3: element.course_3, course_4: element.course_4, course_5: element.course_5
          };
          let username= person.username;
          let password = person.password;
          let first_name = person.first_name;
          let last_name = person.last_name;
          let degree = person.degree;
          let test_result = person.test_result;
          let test_date = person.test_date;
          let course_1 = person.course_1;
          let course_2 = person.course_2;
          let course_3 = person.course_3;
          let course_4 = person.course_4;
          let course_5 = person.course_5;
          if (param2 == password)
          {
            localStorage.setItem("USER-INFO", JSON.stringify(person));
            console.log('LOGIN SUCCESSFUL');
            let data =
            {
                "device_id": deviceID, //bluetooth Can change
                "username": username,
                "password": password,
                "first_name": first_name,
                "last_name": last_name,
                "degree": degree,
                "test_date": test_date,
                "test_result": test_result,
                "course_1": course_1,  //Can change
                "course_2": course_2,  //Can change
                "course_3": course_3,  //Can change
                "course_4": course_4,  //Can change
                "course_5": course_5,  //Can change
            }
            this.UpdateUser(data,username);
            const toast = await this.toastCtrl.create({message:'Login Successful', duration:2000, color:'success',position:'top'});
            await toast.present();
            let params: NavigationExtras = {
              queryParams: {
                device_id: deviceID,
                emailFinal: username,
                passwordFinal: password,
                nameFinal: first_name,
                surnameFinal: last_name,
                statusFinal: test_result,
                dateFinal: test_date,
                course1Final: course_1,
                course2Final: course_2,
                course3Final: course_3,
                course4Final: course_4,
                course5Final: course_5,
              },
            };
            if (degree == 3) {
              setTimeout(() => {
                this.router.navigate(['/login'], params);
              }, 2000);
            }
            else if (degree == 2) {
              setTimeout(() => {
                this.router.navigate(['/staff'], params);
              }, 2000);
            }
            else if (degree == 1) {
              setTimeout(() => {
                this.router.navigate(['/admin'], params);
              }, 2000);
            }
          }
          else {
            console.log('INCORRECT PASSWORD');
            const toast = await this.toastCtrl.create({message:'INCORRECT PASSWORD', duration:2000, color:'danger',position:'top'});
            await toast.present();
          }
          
        }
      }
      console.log(response);
      }, (err) => {
        console.log('entering errors');
        console.log(err);
      });
  }
  //TESTED
  CreateUser(info) {
    let url = "https://covid-emu.herokuapp.com/users";
    //console.log(info);
    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    let body = info;
    this.http.post<any>(url, body, {headers: this.getHeaders(), responseType: 'json'}).subscribe(data => {
      localStorage.setItem("USER-INFO", JSON.stringify(body));
      //console.log(data);
      this.dataRecieved2 = data;
      //console.log(this.dataRecieved);
      if (info.degree == 3) {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
      else if (info.degree == 2) {
        setTimeout(() => {
          this.router.navigate(['/staff']);
        }, 1000);
      }
      else if (info.degree == 1) {
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      }
    }),(err) => {
      console.log('entering errors');
      console.log(err);
    };
    console.log(this.dataRecieved);
  }
  //TESTED
  UpdateUser(passed,username) {
    let body = passed;
    console.log(body);
    console.log(username);
    let url = "https://covid-emu.herokuapp.com/users";
    // let newurl = `${url}/${username}`;
    this.http.put<any>(url, body, {headers: this.getHeaders(), responseType: 'json'}).subscribe(data => {
      let params: NavigationExtras = {
        queryParams: {
          test_result: body.test_result,
          test_date: body.test_date
        },
      };
      localStorage.setItem("USER-INFO", JSON.stringify(passed));
      let covidInfo = { test_result: passed.test_result, test_date: passed.test_date};
      localStorage.setItem("Test-Info", JSON.stringify(covidInfo));
      
      //SEND CLOSE CONTACTS TO DB AND SEND NOTIFICATION TO DEVICES
      if (passed.degree == 3) {
        setTimeout(() => {
          this.router.navigate(['/login'],params);
        }, 1000);
      }
      else if (passed.degree == 2) {
        setTimeout(() => {
          this.router.navigate(['/staff'],params);
        }, 1000);
      }
      else if (passed.degree == 1) {
        setTimeout(() => {
          this.router.navigate(['/admin'],params);
        }, 1000);
      }
    }),(err) => {
      alert(err);
    };
  }
  //TESTED
  UpdateSettings(message, day) {
    let url = "https://covid-emu.herokuapp.com/settings";
    let data =
    {
      "message": message,
      "test_period": day,
    }
    this.http.put(url, data, { headers: this.getHeaders() }).subscribe
      (async (response) =>
      {
        console.log(response)
      },
      (err) => {
        console.log(err);
      });
  }
  //TESTED
  GetSettings() {
    let url = "https://covid-emu.herokuapp.com/settings";
    this.http.get(url, { headers: this.getHeaders() }).subscribe
    (async (response) => {
      if (typeof (response) == "undefined") {
        console.log('missing data');
      }
      for (let key in response) {
        if (response.hasOwnProperty(key)) {

          let element = response[key];
          let dbSettings = {
            message: element.message, test_period: element.test_period,
          };
          let appMessage = dbSettings.message;
          let appDays = dbSettings.test_period;
          console.log(appMessage);
          console.log(appDays);

          localStorage.setItem("Welcome-Info", JSON.stringify(dbSettings));
        }
      }
      console.log(response);
      }, (err) => {
        console.log('entering errors');
        console.log(err);
        this.check2 = false;
    });
    
    this.router.navigate(['/folder']);
  }
  //TESTED
  GetMyStudents(course) {
    let url = "https://covid-emu.herokuapp.com/positives";
    let newurl = `${url}/${course}`;
    let positiveStudents = [];
    this.http.get<any>(newurl, { headers: this.getHeaders(), responseType: 'json' }).subscribe(data => {
      if (typeof (data) == "undefined") {
      }
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          positiveStudents.push(data[key]);
        }
      }
      }, (err) => {
        console.log('entering errors');
        console.log(err);
    });
    setTimeout(() => {
      localStorage.setItem('positiveStudents', JSON.stringify(positiveStudents));
      this.router.navigate(['/student-list']);
    }, 1000);
  }
}