import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-look-upload',
  templateUrl: './look-upload.component.html',
  styleUrls: ['./look-upload.component.scss']
})
export class LookUploadComponent implements OnInit {
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
    this.selectUser();
  }

  selectUser() {
    this.http.get<ResponseType>('adminItems/adminItems')
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
  addComments() {
    console.log(this.car);
    this.readonlyData = false;
    this.addUser = true;
    this.http.get<any>('adminItems/addItems?itemsname=' + this.car.name + '&username=' + this.car.username
      + '&itemsintroduction=' + this.car.statu + '&spenumber=' + this.car.speciesname + '&imgname='
      + this.car.imgname).subscribe(
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
    this.http.get<any>('adminItems/deleteItems?id=' + this.car.id).subscribe(
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
  // 修改
  updateItems() {
    console.log(this.car);
    // updateUserpwd
    this.http.get<any>('adminItems/updateItems?itemsname= ' + this.car.name + '&spenumber=' + this.car.speciesname + '&username='
      + this.car.username + '&itemsintroduction=' + this.car.statu + '&imgname=' + this.car.imgname + '&iditems=' + this.car.id)
      .subscribe(
        data => {
          console.log(data);
          // tslint:disable-next-line:triple-equals
          if (data.code == 200) {
            alert('修改成功');
            this.displayDialog = false;
            this.selectUser();
            // tslint:disable-next-line:triple-equals
          } else if (data.code == 250) {
            alert('修改失败请重试！');
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

  constructor(public id?, public username?, public imgname?, public name?, public statu?, public downtime?, public speciesname?) { }
}



export interface Car {
  id?;
  username?;
  imgname?;
  name?;
  statu?;
  downtime?;
  speciesname?;
}
