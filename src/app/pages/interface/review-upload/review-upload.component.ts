import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpApi, ResponseType } from '../../../shared/do-service/http-api.service';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-review-upload',
  templateUrl: './review-upload.component.html',
  styleUrls: ['./review-upload.component.scss']
})
export class ReviewUploadComponent implements OnInit {
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
    this.http.get<ResponseType>('reviewUpload/reviewUpload')
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
  // 不通过
  delete() {
    console.log(this.car);
    this.http.get<any>('reviewUpload/onReviewUoload?iditems=' + this.car.iditems).subscribe(
      data => {
        console.log(data);
        // tslint:disable-next-line:triple-equals
        if (data.code == 200) {
          alert('不通过操作成功');
          this.displayDialog = false;
          this.selectUser();
          // tslint:disable-next-line:triple-equals
        } else if (data.code == 250) {
          alert('不通过操作失败请重试！');
          this.displayDialog = false;
        } else {
          alert('由于网络等未知原因操作失败，请检查网络后重试');
          this.displayDialog = false;
        }
      }
    );
  }
  // 通过
  updateItems() {
    console.log(this.car);
    // updateUserpwd
    const datatime = this.car.itemsdowntime1.substring(0, 19);
    this.http.get<any>('reviewUpload/reviewInsert?iditems=' + this.car.iditems + '&itemsname=' + this.car.itemsname
      + '&imgname=' + this.car.imgname + '&itemsdowntime=' + datatime + '&itemsintroduction=' + this.car.itemsintroduction
      + '&username' + this.car.username + '&spenumber=' + this.car.spenumber)
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

  constructor(public iditems?, public username?, public imgname?, public itemsname?,
    public itemsintroduction?, public itemsdowntime?, public speciesname?, public spenumber?,
    public itemsdowntime1?) { }
}



export interface Car {
  iditems?;
  itemsname?;
  imgname?;
  itemsdowntime?;
  itemsintroduction?;
  username?;
  speciesname?;
  spenumber?;
  itemsdowntime1?;
}

