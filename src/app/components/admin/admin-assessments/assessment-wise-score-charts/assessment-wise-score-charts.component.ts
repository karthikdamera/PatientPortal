import { Component, Output, EventEmitter, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationComponent } from '../../../../shared/validation/validation.component';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { AdminAssessmentService } from '../adminAssessment.service';;

@Component({
    moduleId: module.id,
    selector: 'app-assessment-wise-score-charts',
    templateUrl: './assessment-wise-score-charts.component.html',
    styleUrls: ['./assessment-wise-score-charts.component.scss'],
    providers: [DatePipe, AdminAssessmentService]
})
export class AssessmentWiseScoreChartsComponent implements OnInit {

    @Output() isShowoverallchartChange = new EventEmitter();
    obj = {
        id: 0,
        type: 'overallchartsdata'
    };
    @Input() patientid: number;
    @Input() SurveyId: any;
    public clientId: number;
    public serviceToggleFlag: number = 0;
    public labelHeader: string = 'Assessment Wise';
    public selected: any;
    public selectDate: any = 10;
    public todayDate: Date = new Date();
    public previousDate: Date = new Date();
    public options: any = {};
    public chartData = [];
    showLoader: boolean;
    public questionChartData: any = [];
    public questionChartItems = new Array(21);
    public assessmentWiseDateItems: any = [];
    public assessmentWiseScoreItems: any = [];
    public questionWiseDateItems: any = [];
    public questionWiseScoreItems: any = [];
    public chartItems: any = [];
    public chartQuestionItems: any = [];
    date: any;
    ChartDays = [
        { 'title': '1D', 'type': 'D', 'value': 1 },
        { 'title': '5D', 'type': 'D', 'value': 5 },
        { 'title': '1M', 'type': 'M', 'value': 1 },
        { 'title': '2M', 'type': 'M', 'value': 2 },
        { 'title': '3M', 'type': 'M', 'value': 3 },
        // { 'title': '4M', 'type': 'M', 'value': 4 },
        // { 'title': '5M', 'type': 'M', 'value': 5 },
        { 'title': '6M', 'type': 'M', 'value': 6 },
        { 'title': 'YTD', 'type': 'YTD', 'value': 1 },
        { 'title': '1Y', 'type': 'Y', 'value': 1 }
    ];
    activeChartDay = '';
    activeChart = 'line';
    isload: boolean;
    public fmDt: any;
    public toDt: any;

    constructor(private customService: AdminAssessmentService, private route: ActivatedRoute, private router: Router) {
        // alert('overall');
    }
    ngOnInit() {
        this.clientId = this.patientid;
        this.SurveyId = 251;
        // <-----for getting 3 days data as default------->
        this.calculateDateRange(this.ChartDays[2]);
        this.getOverallChartData().add(() => {
            for (let row = 0; row < this.chartData.length; row++) {
                this.assessmentWiseDateItems[row] = this.chartData[row].Date;
                this.assessmentWiseScoreItems[row] = this.chartData[row].TotalScore;
                this.chartItems[row] = new Array(2);
                this.chartItems[row][0] = this.chartData[row].Date;
                this.chartItems[row][1] = this.chartData[row].TotalScore;
            }
            this.options = this.renderChart(this.activeChart, this.chartItems);
            console.log(this.options);
            console.log('********load************');
            this.getAssementChart();
        });
        this.getQuestionChartData().add(() => {
        });
    }
    loading() {
        this.isload = true;
    }
    // <-----for getting overallchart data from api-------->
    public getOverallChartData() {
        // this.showLoader = true;
        return this.customService.getOverallChartData(this.fmDt, this.toDt, this.clientId, this.SurveyId).subscribe(arg => {
            this.chartData = arg.data;
            //  console.log("OverallChartData" + (JSON.stringify(this.chartData = arg)));
            // this.showLoader = false;
        });
    }
    // <-----for getting questionwisechart data from api-------->
    public getQuestionChartData() {
        const currentYear = new Date();
        const _d = new Date();
        _d.setFullYear(_d.getFullYear() - 1);
        const fromQDate = this.MMDDYYYY(_d);
        const toQDate = this.MMDDYYYY(currentYear);
        return this.customService.getQuestionChartData(fromQDate, toQDate, this.clientId, this.SurveyId).subscribe(arg => {
            this.questionChartData = arg.data;
            // console.log("q data "+JSON.stringify(arg));
        });
    }
    // <-----for getting overallchart data from api for individual questions-------->
    getChartByQuestion(qid) {
        // alert(qid);
        this.serviceToggleFlag = 1;
        this.selected = qid;
        this.labelHeader = 'Question Wise';
        for (let i = 0; i < this.questionChartData.length; i++) {
            //  console.log(this.questionChartData);
            if (parseInt(this.questionChartData[i].QuestionId) === parseInt(qid)) {
                for (let row = 0; row < this.questionChartData[i].Assessments.length; row++) {
                    // var i=0;
                    this.questionWiseDateItems[row] = this.questionChartData[i].Assessments[row].Date;
                    this.questionWiseScoreItems[row] = this.questionChartData[i].Assessments[row].Score;
                    // i++;
                    this.chartQuestionItems[row] = new Array(2);
                    this.chartQuestionItems[row][0] = this.questionChartData[i].Assessments[row].Date;
                    this.chartQuestionItems[row][1] = this.questionChartData[i].Assessments[row].Score;
                }
            }
        }
        this.options = this.renderChart(this.activeChart, this.chartQuestionItems);

        // console.log(JSON.stringify(this.questionWiseScoreItems));
        //  console.log(this.chartQuestionItems);
    }
    // <--------for getting overallchart data based on selected data range for line--------->
    getChartBySelectedDate(days, chartDay?: any) {
        this.calculateDateRange(chartDay);
        if (this.serviceToggleFlag === 0) {
            // this.getQuestionChartData();
            let dateItems: any = [];

            this.customService.getOverallChartData(this.fmDt, this.toDt, this.clientId, this.SurveyId).subscribe(arg => {
                this.chartData = arg.data;
                // console.log(" over all data for 3 days " + JSON.stringify(this.chartData));

                for (let row = 0; row < this.chartData.length; row++) {
                    this.assessmentWiseDateItems[row] = this.chartData[row].Date;
                    this.assessmentWiseScoreItems[row] = this.chartData[row].TotalScore;
                    dateItems[row] = new Array(2);
                    dateItems[row][0] = this.chartData[row].Date;
                    dateItems[row][1] = this.chartData[row].TotalScore;
                }
                this.options = Object.create(this.options);
                this.options = this.renderChart(this.activeChart, dateItems);
            });
            // this.getOverallChartData().add(() => {
            //     for (let row = 0; row < this.chartData.length; row++) {
            //         this.assessmentWiseDateItems[row] = this.chartData[row].Date;
            //         this.assessmentWiseScoreItems[row] = this.chartData[row].TotalScore;
            //         this.chartItems[row] = new Array(2);
            //         this.chartItems[row][0] = this.chartData[row].Date;
            //         this.chartItems[row][1] = this.chartData[row].TotalScore;
            //     }
            //     this.options = this.renderChart(this.activeChart, this.chartItems);
            // });
            // console.log(dateItems);
        } else {
            // <--------for getting questionwise data based on selected data range for line--------->  
            let dateItems: any = [];
            this.customService.getQuestionChartData(this.fmDt, this.toDt, this.clientId, this.SurveyId).subscribe(arg => {
                this.questionChartData = arg.data;
                //  console.log(" question wise data for 3 days " + JSON.stringify(this.questionChartData));
                for (let i = 0; i < this.questionChartData.length; i++) {
                    if (parseInt(this.questionChartData[i].QuestionId) === parseInt(this.selected)) {
                        for (let row = 0; row < this.questionChartData[i].Assessments.length; row++) {
                            dateItems[row] = new Array(2);
                            dateItems[row][0] = this.questionChartData[i].Assessments[row].Date;
                            dateItems[row][1] = this.questionChartData[i].Assessments[row].Score;
                        }

                    }
                }
                this.options = Object.create(this.options);
                this.options = this.renderChart(this.activeChart, dateItems);
            });
            //  console.log("select"+dateItems);
        }

    }
    // <-------for overallchart data------>
    getAssementChart() {

        this.serviceToggleFlag = 0;
        this.labelHeader = 'Assessment Wise';
        this.selected = 0;
        this.options = Object.create(this.options);
        this.options = {
            chart: {
                renderTo: 'container',
                type: this.activeChart
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: this.assessmentWiseDateItems
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: 'TotalScore '
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                enabled: false
            },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },

            series: [{
                name: 'Score',
                data: this.assessmentWiseScoreItems
            }]
        };
        console.log(this.options);
        console.log('********click************');
    }
    isActive(qid) {
        return this.selected === qid;
    }
    public getChart(type) {
        this.activeChart = type;
        this.options = Object.create(this.options);
        // <---for overallchart data--->
        if (this.serviceToggleFlag === 0) {
            let dataItems: any = [];
            for (let row = 0; row < this.chartData.length; row++) {
                dataItems[row] = new Array(2);
                dataItems[row][0] = this.chartData[row].Date;
                dataItems[row][1] = this.chartData[row].TotalScore;
            }
            //  console.log(dataItems);
            this.options = this.renderChart(type, dataItems);
        }
        // <-----for questionwise chart data-------->
        else if (this.serviceToggleFlag === 1) {
            let dataItems: any = [];
            for (let i = 0; i < this.questionChartData.length; i++) {
                if (parseInt(this.questionChartData[i].QuestionId) === parseInt(this.selected)) {
                    for (let row = 0; row < this.questionChartData[i].Assessments.length; row++) {
                        dataItems[row] = new Array(2);
                        dataItems[row][0] = this.questionChartData[i].Assessments[row].Date;
                        dataItems[row][1] = this.questionChartData[i].Assessments[row].Score;
                    }
                }
            }
            this.options = this.renderChart(type, dataItems);
        }
    }
    public renderChart(type, data): any {
        let chartData: any = {};
        // <----for line chart------>
        if (type === 'line') {
            chartData = {
                chart: {
                    type: type
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
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
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            };
        }
        // <----for bar chart------>
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
                    showInLegend: false

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
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            };
        }
        else if (type === 'scatter') {
            chartData = {
                chart: {
                    type: type
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'category',
                    showInLegend: false
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
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            };

        }
        return chartData;
    }
    // <-----for getting chart corresponding to selected date range------->
    public calculateDateRangeold(days) {
        this.activeChartDay = days;
        this.previousDate = new Date();
        this.previousDate.setDate(this.previousDate.getDate() - parseInt(days));
        //  console.log(this.previousDate);

        // var fdd = this.previousDate.getDate();
        const fdd = ('0' + this.previousDate.getDate()).slice(-2);
        // var fmm = this.previousDate.toLocaleString(locale, { month: "long" });
        const fmm = ('0' + (this.previousDate.getMonth() + 1)).slice(-2);
        const fyyyy = this.previousDate.getFullYear();
        this.fmDt = (fmm + '/' + fdd + '/' + fyyyy).toString();
        this.todayDate = new Date();
        // var tdd = this.todayDate.getDate();
        const tdd = ('0' + this.todayDate.getDate()).slice(-2);
        const locale = 'en-us';
        const tmm = ('0' + (this.todayDate.getMonth() + 1)).slice(-2);
        const tyyyy = this.todayDate.getFullYear();
        this.toDt = (tmm + '/' + tdd + '/' + tyyyy).toString();

    }
    calculateDateRange(chartDay) {
        const d = new Date();
        this.activeChartDay = chartDay.title;
        console.log(chartDay);
        // let fromDate: any;
        // let toDate: any;
        switch (chartDay.type) {
            case 'D':
                const currentDate = new Date();
                d.setDate(d.getDate() - chartDay.value);
                this.fmDt = this.MMDDYYYY(d);
                this.toDt = this.MMDDYYYY(currentDate);
                break;
            case 'M':
                const currentMonth = new Date();
                d.setMonth(d.getMonth() - chartDay.value);
                //  alert("month   "+d);
                this.fmDt = this.MMDDYYYY(d);
                this.toDt = this.MMDDYYYY(currentMonth);
                break;
            case 'YTD':
                const today = new Date();
                const dd = today.getDate();
                const mm = today.getMonth() + 1; // January is 0!
                const yyyy = today.getFullYear();
                console.log(dd + ',' + mm + ',' + yyyy);
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const firstDate = new Date(yyyy, 0, 1);
                this.fmDt = this.MMDDYYYY(firstDate);
                const currentYTDDate = new Date();
                this.toDt = this.MMDDYYYY(currentYTDDate);
                // const secondDate = new Date(yyyy, mm, dd);
                // const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                // this.toDt = this.MMDDYYYY(secondDate);
                break;
            case 'Y':
                const currentYear = new Date();
                d.setFullYear(d.getFullYear() - chartDay.value);
                this.fmDt = this.MMDDYYYY(d);
                this.toDt = this.MMDDYYYY(currentYear);

        }
    }
    MMDDYYYY(value) {
        // alert(value);
        let mm = (value.getMonth() + 1);
        mm = (mm < 10) ? '0' + mm : mm;
        return mm.toString() + '/' + value.getDate() + '/' + value.getFullYear();
    }
    DateDiffinDays(date1, date2) {
        // Get 1 day in milliseconds
        const one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        const date1_ms = date1.getTime();
        const date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        const difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    }
    back() {
        this.isShowoverallchartChange.emit(this.obj);
    }
}
