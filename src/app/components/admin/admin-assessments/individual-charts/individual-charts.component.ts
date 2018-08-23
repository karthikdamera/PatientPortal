import { Component, Output, EventEmitter, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationComponent } from '../../../../shared/validation/validation.component';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { AdminAssessmentService } from '../adminAssessment.service';

@Component({
  moduleId: module.id,
  selector: 'app-individual-charts',
  templateUrl: './individual-charts.component.html',
  styleUrls: ['./individual-charts.component.scss'],
  providers: [DatePipe, AdminAssessmentService]
})
export class IndividualChartsComponent implements OnInit {

  @Output() isShowindividualchartChange = new EventEmitter();
  obj = {
    id: 0,
    type: 'individualchartsdata'
  };
  @Input() patientid: number;
  @Input() assessmentId: any;
  @Input() SurveyId: any;
  public individualChartDataItems: any[];
  public options: any = {};
  public questionIdItems: any = [];
  public questionNameItems: any = [];
  public scoreItems: any = [];
  public paramId: any;
  showLoader: boolean;
  // <--------getting individual chart data---------->
  public chartData: any = [];
  public barChartItems: any = [];
  constructor(private customService: AdminAssessmentService, private route: ActivatedRoute, private router: Router) {
    // console.log(this.chartData);
  }
  ngOnInit() {
    // <----for getting id dynamically------>
    this.paramId = this.assessmentId;
    // this.SurveyId = this.SurveyId;
    this.getQuestionChartData().add(() => {
      // console.log(this.individualChartDataItems);
      for (let row = 0; row < this.individualChartDataItems.length; row++) {
        this.questionIdItems[row] = this.individualChartDataItems[row].QuestionId.toString();
        this.scoreItems[row] = this.individualChartDataItems[row].Score;
        this.questionNameItems[row] = this.individualChartDataItems[row].QuestionName;
        this.chartData[row] = new Array(2);
        this.chartData[row][0] = 'Q ' + (row + 1);
        this.chartData[row][1] = this.individualChartDataItems[row].Score;
      }
      this.options = Object.create(this.options);
      this.options = this.renderChart('line', this.chartData);
    });
  }
  // <-------for getting individual chart data from api--------->
  public getQuestionChartData() {
    // this.showLoader =true;
    return this.customService.getIndividualChartData(this.paramId, this.SurveyId).subscribe(arg => {
      this.individualChartDataItems = arg.data;
      // console.log("question items" + (JSON.stringify(this.individualChartDataItems)))
      // this.showLoader =false;
    });
  }
  // <-------for renderring charts using same method which used in overall.ts-------->
  public getChart(type) {
    this.options = Object.create(this.options);
    this.options = this.renderChart(type, this.chartData);
  }
  public renderChart(type, data): any {
    let chartData: any = {};
    // <-----for line chart------>
    if (type === 'line') {
      chartData = {
        chart: {
          type: type
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Score'
          }
        },
        tooltip: {
          pointFormat: 'Score: <b>{point.y}</b>'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          enabled: false
        },
        series: [{
          name: 'Population',
          data: data,
          dataLabels: {
            enabled: false,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
              enabled: false
            }
          }
        }]
      };
    }
    // <-----for bar chart------>
    else if (type === 'column') {
      chartData = {
        chart: {
          type: type
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Score'
          }
        },
        tooltip: {
          pointFormat: 'Score: <b>{point.y}</b>'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          enabled: false
        },
        series: [{
          name: '',
          data: data,
          dataLabels: {
            enabled: false,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
              enabled: false
            }
          }
        }]
      };
    }
    // <-----for pie chart------>
    else if (type === 'scatter') {
      chartData = {
        chart: {
          type: type
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Score'
          }
        },
        tooltip: {
          pointFormat: 'Score: <b>{point.y}</b>'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          enabled: false
        },
        series: [{
          name: 'Question',
          data: data,
          dataLabels: {
            enabled: false,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
              enabled: false
            }
          }
        }]
      };
    }
    return chartData;
  }
  back() {
    this.isShowindividualchartChange.emit(this.obj);
  }
}
