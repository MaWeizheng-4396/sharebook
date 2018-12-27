import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DataTableModule, DialogModule } from 'primeng/primeng';
@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {
  loading: boolean;
  settings: any;
  data: any;
  newCar: boolean;
  cars: Car[];
  selectedCar: Car;
  addUser: boolean;
  displayDialog: boolean;
  readonlyData: boolean;
  car: Car = new PrimeCar();

  constructor(private router: Router, private http: HttpApi) {
  }


  ngOnInit() {
    this.addUser = true;
    this.readonlyData = true;
    this.getCarsSmall();
    console.log(this.getCarsSmall);
    this.selectUser();
    // this.data = [
    //   {
    //     id: 1,
    //     name: 'Leanne Graham',
    //     username: 'Bret',
    //     email: 'Sincere@april.biz'
    //   },
    //   {
    //     id: 2,
    //     name: 'Ervin Howell',
    //     username: 'Antonette',
    //     email: 'Shanna@melissa.tv'
    //   },
    //   {
    //     id: 11,
    //     name: 'Nicholas DuBuque',
    //     username: 'Nicholas.Stanton',
    //     email: 'Rey.Padberg@rosamond.biz'
    //   }
    // ];

  }

  selectUser() {
    this.http.get<ResponseType>('adminInterface/userSelect')
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
    );
  }
  count() {
    this.router.navigate(['pages/interface']);
  }
  showDialogToAdd() {
    this.newCar = true;
    this.car = new PrimeCar();
    this.displayDialog = true;
  }

  save() {
    console.log(this.car);
    this.http.get<Response>('').subscribe(
      data => {
        console.log(data);
      }
    );
  }
  addUsers() {
    console.log(this.car);
    this.readonlyData = false;
    this.addUser = true;
    this.http.get<any>('adminInterface/addUsers?usersname=' + this.car.name + '&users_email=' + this.car.email
      + '&users_tel=' + this.car.tel + '&usersStudentId=' + this.car.studentID).subscribe(
        data => {
          // tslint:disable-next-line:triple-equals
          if (data.code == 200) {
            alert('添加成功');
            this.selectUser();
            this.displayDialog = false;
            // tslint:disable-next-line:triple-equals
          } else if (data.code == 250) {
            alert('添加失败请重试！');
            this.displayDialog = false;
          } else {
            alert('由于未知错误导致添加失败，请检查网络');
            this.displayDialog = false;
          }
        }
      );
  }
  delete() {
    console.log(this.car);
    this.http.get<any>('adminInterface/deleteUsers?idusers=' + this.car.id).subscribe(
      data => {
        console.log(data);
        // tslint:disable-next-line:triple-equals
        if (data.code == 200) {
          alert('删除成功');
          this.displayDialog = false;
          this.selectUser();
          // tslint:disable-next-line:triple-equals
        } else if (data.code == 250) {
          alert('删除失败请重试！');
          this.displayDialog = false;
        } else {
          alert('由于未知错误导致添加失败，请检查网络');
          this.displayDialog = false;
        }
      }
    );
  }
  // 重置密码
  refushPwd() {
    console.log(this.car);
    // updateUserpwd
    this.http.get<any>('adminInterface/updateUserpwd?idusers= ' + this.car.id)
      .subscribe(
        data => {
          console.log(data);
          // tslint:disable-next-line:triple-equals
          if (data.code == 200) {
            alert('重置成功');
            this.displayDialog = false;
            // tslint:disable-next-line:triple-equals
          } else if (data.code == 250) {
            alert('重置失败请重试！');
            this.displayDialog = false;
          } else {
            alert('由于未知错误导致添加失败，请检查网络');
            this.displayDialog = false;
          }
        },
    );
  }

  onRowSelect(event) {
    console.log(event);
    this.addUser = false;
    this.newCar = false;
    this.car = this.cloneCar(event.data);
    console.log(this.car);
    this.displayDialog = true;
  }

  cloneCar(c: Car): Car {
    const car = new PrimeCar();
    // tslint:disable-next-line:forin
    for (const prop in c) {
      car[prop] = c[prop];
    }
    console.log(car);
    return car;
  }

  findSelectedCarIndex(): number {
    return this.cars.indexOf(this.selectedCar);
  }
  getCarsSmall() {
    return this.http.get<ResponseType>('adminInterface/userSelect')
      .subscribe(
        data => {
          console.log(data);
          // this.data = data;
        },
    );
  }
}
class PrimeCar implements Car {

  constructor(public id?, public name?, public tel?, public email?, public studentID?) { }
}



export interface Car {
  id?;
  name?;
  tel?;
  email?;
  studentID?;
}
