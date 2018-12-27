import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpApi, ResponseType } from '../../shared/do-service/http-api.service';
import * as echarts from 'echarts';
@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {
  theme = 'echart-theme';
  title = '校内共享APP精灵后台管理系统';

  leftTopOption = {};
  rightTopOption = {};
  constructor(private http: HttpApi, private router: Router, private route: ActivatedRoute, private zone: NgZone) { }

  ngOnInit() {

    this.http.get<any>('adminInterface/adminInterface')
      .subscribe(
        data => {
          console.log(data);
          this.leftTopOption = {
            color: ['#296FDD', '#65feca', '#e33f2e', '#6f4ce8', '#296FDD', '#65feca', '#e33f2e', '#6f4ce8'],
            backgroundColor: 'rgba(91,92,110,0)',
            title: {
              text: '上传比例图',
              x: 'center',
              top: '2%',
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              bottom: '3%',
              data: data.name,
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true,
                  }
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                data: data,
              }
            ]
          };
        },
    );
    // adminInterSelect
    this.http.get<any>('adminInterface/adminInterSelect')
      .subscribe(
        data => {
          this.rightTopOption = {
            color: ['#296FDD', '#65feca', '#e33f2e', '#6f4ce8', '#296FDD', '#65feca', '#e33f2e', '#6f4ce8'],
            backgroundColor: 'rgba(91,92,110,0)',
            // color: ['#3398DB'],
            title: {
              text: '预约使用比例图',
              x: 'center',
              top: '2%',
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              bottom: '3%',
              data: data.name,
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true,
                  }
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                data: data,
              }
            ]
          };
        }
      );
  }

  reviewUpload(event) {
    console.log(event);
    this.router.navigate(['pages/reviewupload']);
  }

  adminUpload(event) {
    this.router.navigate(['pages/adminupdate']);
  }

  lookUpload(event) {
    this.router.navigate(['pages/lookupload']);
  }

  lookComments(event) {
    this.router.navigate(['pages/lookcomments']);
  }
}
