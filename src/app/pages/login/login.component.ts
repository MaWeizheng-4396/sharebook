import { MenubarModule } from 'primeng/components/menubar/menubar';
import { Component, OnInit } from '@angular/core';
import { HttpApi, ResponseType } from '../../shared/do-service/http-api.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: any;
  pwd: any;
  display: boolean;
  constructor(private http: HttpApi, private router: Router, private zone: NgZone) {
    this.display = false;
  }

  ngOnInit() {

  }
  submitThis() {
    this.http.get<any>('login/adminLogin?name=' + this.name + '&pwd=' + this.pwd)
      .subscribe(
        data => {
          console.log(typeof(data.code));
          if (data.code === '200') {
            alert('登录成功');
            this.router.navigate(['pages/interface']);
            // 登录成功
          } else if (data.code === '250') {
            alert('用户名或密码错误，请重试');
          } else {
            alert('发生了未知错误，请检查网络重试');
          }
        },
    );
  }
}

