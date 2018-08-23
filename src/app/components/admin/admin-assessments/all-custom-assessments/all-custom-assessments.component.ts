import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ValidationComponent } from '../../../../shared/validation/validation.component';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { AdminAssessmentService } from '../adminAssessment.service';
import { PatientQuestionnaireModel } from '../../../../models/patient-questionnaire.model';
import { AlertQuestionLevelModel } from '../../../../models/alert-questionlevel-model';
import { PatientQuestionModel } from '../../../../models/patient-question.model';
import { ChildQuestionModel } from '../../../../models/child-question-model';
import { QuestionTypeEnum } from '../../../../models/QuestionTypeEnum';
declare var jQuery: any;
declare let jsPDF;

@Component({
    moduleId: module.id,
    selector: 'app-all-custom-assessments',
    templateUrl: './all-custom-assessments.component.html',
    styleUrls: ['./all-custom-assessments.component.scss'],
    providers: [DatePipe, AdminAssessmentService]
})
export class AllCustomAssessmentsComponent implements OnInit {
    @Output() isShowassessmentChange = new EventEmitter();
    obj = {
        id: 0,
        type: 'customeassessments'
    };
    @Input() patientid: number;
    @Input() assessmentId: any;
    // to show and hide assessments
    selectedChoice: any = {};
    checked: string[] = [];
    message: string;
    error: any;
    scheduleDate: any;
    qid: string;
    questiontype: any = QuestionTypeEnum;
    // <--------getting data in assessmentSections object------->
    assessmentSections: any = [];
    assessmentSection: any = {};
    public disableButton: boolean;
    // assessmentId: any;
    d = new Date();
    id: any;
    clientid: number;
    checkBoxArray: any = [];
    childCheckBoxArray: any = [];
    totalNumberOfSection: number;
    tempArray: any;
    qId: number;
    currentPage: number;
    providerId: number;
    providerName: string;
    //  <-----posting data in postDataItems-------->
    postDataItems: PatientQuestionModel[] = [];
    alertsQuestionObject: AlertQuestionLevelModel[] = [];
    assessmentRequest: AssessmentRequest;
    assessmentData: any = [];
    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe,
        private _assessmentService: AdminAssessmentService) {
        this.toastr.setRootViewContainerRef(vcr);
        // alert(this.id);
        this.providerId = 4;
        this.providerName = 'Wang Institute';
        this.currentPage = 0;
    }
    ngOnInit() {
        this.id = this.assessmentId;
        this.clientid = this.patientid;
        // alert(this.id  + ',' + this.clientid);
        const date = new Date();
        let monthName = '';
        monthName = this._assessmentService.getMonthname(date);
        this.scheduleDate = new Date().getDate() + '' + monthName + '' + '' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        console.log(this.scheduleDate);
        this.getAssessment().add(() => {
            // alert();
            this.totalNumberOfSection = this.assessmentSections.length;
            this.assessmentSection = this.assessmentSections[0];
            for (let section = 0; section < this.totalNumberOfSection; section++) {
                for (let i = 0; i < this.assessmentSections[section].Questions.length; i++) {
                    const childObj: ChildQuestionModel[] = [];
                    let scoreValue = 0;
                    if (this.assessmentSections[section].Questions[i].SelectedID !== 0) {
                        const string = this.assessmentSections[section].Questions[i].SelectedValue;
                        const array = string.split(',');
                        for (let j = 0; j < this.assessmentSections[section].Questions[i].Choices.length; j++) {
                            if (this.assessmentSections[section].Questions[i].SelectedID ===
                                this.assessmentSections[section].Questions[i].Choices[j].ChoiceId) {
                                scoreValue = this.assessmentSections[section].Questions[i].Choices[j].Score;
                            }
                            if (this.assessmentSections[section].Questions[i].TypeName === 'Checkbox') {
                                for (let chkCh = 0; chkCh < array.length; chkCh++) {
                                    if (this.assessmentSections[section].Questions[i].Choices[j].ChoiceName === array[chkCh]) {
                                        //  this.checkBoxArray.push(array[chkCh]);
                                        this.assessmentSections[section].Questions[i].Choices[j].Checked = true;
                                    }
                                }
                            }
                        }
                    }
                    for (let child = 0; child < this.assessmentSections[section].Questions[i].ChildQuestions.length; child++) {
                        let childScoreValue = 0;
                        if (this.assessmentSections[section].Questions[i].IsParent === true) {
                            //  if child option are already been selected/saved in db
                            if (this.assessmentSections[section].Questions[i].ChildQuestions[child].SelectedID !== 0) {
                                const childString = this.assessmentSections[section].Questions[i].ChildQuestions[child].SelectedValue;
                                const childArray = childString.split(',');
                                for (let k = 0; k < this.assessmentSections[section].Questions[i]
                                    .ChildQuestions[child].Choices.length; k++) {
                                    if (this.assessmentSections[section].Questions[i].ChildQuestions[child]
                                        .SelectedID === this.assessmentSections[section]
                                            .Questions[i].ChildQuestions[child].Choices[k].ChoiceId) {
                                        childScoreValue = this.assessmentSections[section].Questions[i]
                                            .ChildQuestions[child].Choices[k].Score;
                                    }
                                    if (this.assessmentSections[section].Questions[i].ChildQuestions[child].TypeName === 'Checkbox') {
                                        for (let chkCh = 0; chkCh < childArray.length; chkCh++) {
                                            if (this.assessmentSections[section].Questions[i].ChildQuestions[child].
                                                Choices[k].ChoiceName === childArray[chkCh]) {
                                                // this.childCheckBoxArray.push(childArray[chkCh]);
                                                this.assessmentSections[section].Questions[i].
                                                    ChildQuestions[child].Choices[k].Checked = true;
                                            }
                                        }
                                    }
                                }
                            }
                            childObj.push(
                                new ChildQuestionModel(
                                    this.assessmentSections[section].Questions[i].ChildQuestions[child].QuestionId,
                                    this.assessmentSections[section].Questions[i].ChildQuestions[child].SelectedID,
                                    this.assessmentSections[section].Questions[i].ChildQuestions[child].TypeId,
                                    this.assessmentSections[section].Questions[i].ChildQuestions[child].SelectedValue,
                                    childScoreValue,
                                    this.assessmentSections[section].Questions[i].ChildQuestions[child].QuestionName
                                )
                            );
                        }
                    }
                    this.postDataItems.push(
                        new PatientQuestionModel(
                            this.assessmentSections[section].Questions[i].QuestionId,
                            this.assessmentSections[section].Questions[i].AlertId,
                            this.assessmentSections[section].Questions[i].SelectedID,
                            this.assessmentSections[section].PatientAssessmentId,
                            this.assessmentSections[section].UserId,
                            this.assessmentSections[section].Questions[i].TypeId,
                            this.assessmentSections[section].Questions[i].IsAlert,
                            // true,
                            this.assessmentSections[section].Questions[i].SelectedValue,
                            this.scheduleDate,
                            this.providerId,
                            scoreValue,
                            this.assessmentSections[section].SectionId,
                            this.assessmentSections[section].Questions[i].QuestionName,
                            this.assessmentSections[section].SectionName,
                            this.assessmentSections[section].Questions[i].IsParent,
                            childObj
                        )
                    );
                }
            }
        });
    } // close ngOnInit

    // <-----------getting data dynamically from api--------->
    getAssessment() {
        return this._assessmentService.getAssessmentData(this.id, this.clientid)
            .subscribe(arg => {
                this.assessmentSections = arg.data;
                console.log(JSON.stringify((this.assessmentSections)));
                // this.showLoader = false;
            });
    }
    // <-----for selecting checkbox choices end------>
    onSelect(choice, answer, index, asmObject, isChecked) {
        this.checkBoxArray = [];
        console.log(this.assessmentSections);
        for (let i = 0; i < this.assessmentSections[this.currentPage].Questions[index].Choices.length; i++) {
            if (this.assessmentSections[this.currentPage].Questions[index].Choices[i].Checked === true) {
                this.checkBoxArray.push(this.assessmentSections[this.currentPage].Questions[index].Choices[i].ChoiceName);
            }
        }
        //  console.log('checkBoxArray', this.checkBoxArray);
        //   console.log('asmObject', asmObject);
        //   console.log('choice', choice);
        const question = asmObject.Questions[index];
        // var choiceIndex=question.Choices.indexOf(choice.ChoiceId);
        // alert(choiceIndex);
        //   console.log('question', question);
        this.disableButton = false;
        // <--------for selecting options without duplicates---------->
        for (let i = 0; i < this.postDataItems.length; i++) {
            if (this.postDataItems[i].QuestionId === question.QuestionId) {
                if (question.TypeId === this.questiontype.DROPDOWN) {
                    this.postDataItems[i].Answer = '';
                    this.postDataItems[i].ChoiceId = answer;
                    this.assessmentSections[this.currentPage].Questions[index].SelectedID = answer;
                    for (let ch = 0; ch < question.Choices.length; ch++) {
                        if (question.Choices[ch].ChoiceId === answer) {
                            this.postDataItems[i].Score = question.Choices[ch].Score;
                        }

                    }

                } else if (question.TypeId === this.questiontype.CHECKBOX) {
                    // debugger;
                    if (isChecked === true) {
                        //  this.checkBoxArray.push(choice.ChoiceName);
                        for (let ch = 0; ch < question.Choices.length; ch++) {
                            if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
                                this.assessmentSections[this.currentPage].Questions[index].Choices[ch].Checked = true;
                                //   console.log(this.assessmentSections[this.currentPage].Questions[index].Choices[ch].Checked);
                            }
                        }
                        this.checkBoxArray.push(choice.ChoiceName);
                    } else {
                        for (let ch = 0; ch < question.Choices.length; ch++) {
                            if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
                                this.assessmentSections[this.currentPage].Questions[index].Choices[ch].Checked = false;
                                //  console.log(this.assessmentSections[this.currentPage].Questions[index].Choices[ch].Checked);
                            }
                        }
                        var index = this.checkBoxArray.indexOf(choice.ChoiceName);
                        this.checkBoxArray.splice(index, 1);
                    }
                    // console.log(this.checkBoxArray.join());
                    this.postDataItems[i].Answer = this.checkBoxArray.join();
                    this.postDataItems[i].ChoiceId = choice.ChoiceId;
                    this.postDataItems[i].Score = 0;
                } else if (question.TypeId === this.questiontype.RADIO) {
                    this.postDataItems[i].Answer = answer;
                    this.postDataItems[i].ChoiceId = choice.ChoiceId;
                    this.postDataItems[i].Score = choice.Score;
                    this.assessmentSections[this.currentPage].Questions[index].SelectedID = choice.ChoiceId;
                } else if (question.TypeId === this.questiontype.TEXTBOX) {
                    if (answer.length !== 0) {
                        this.postDataItems[i].Answer = answer;
                        this.postDataItems[i].ChoiceId = choice.ChoiceId;
                        this.postDataItems[i].Score = 0;
                        this.assessmentSections[this.currentPage].Questions[index].SelectedValue = answer;
                    } else {
                        this.disableButton = true;
                    }
                }
            }
        }
        //   console.log("postDataItems" + JSON.stringify(this.postDataItems));
    }
    //  onSelect child option/chocies
    onSelectChild(childChoice, answer, childObject, questionId, isChecked, index) {
        // alert(answer);
        for (let section = 0; section < this.totalNumberOfSection; section++) {
            for (let i = 0; i < this.assessmentSections[section].Questions.length; i++) {
                if (questionId === this.assessmentSections[section].Questions[i].QuestionId) {
                    this.qId = i;
                }
            }
        }
        this.childCheckBoxArray = [];
        // console.log("ku"+this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index]);
        // alert(this.assessmentSections[this.currentPage].Questions[index].ChildQuestions[child]);
        for (let l = 0; l < this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index].Choices.length; l++) {
            if (this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index].Choices[l].Checked === true) {
                // alert("aa");
                this.childCheckBoxArray.push(this.assessmentSections[this.currentPage]
                    .Questions[this.qId].ChildQuestions[index].Choices[l].ChoiceName);
            }
        }
        const childQuestion = childObject;
        //    console.log('childQuestion', childQuestion)
        this.disableButton = false;
        for (let i = 0; i < this.postDataItems.length; i++) {
            if (this.postDataItems[i].QuestionId === parseInt(questionId)) {
                for (let child = 0; child < this.postDataItems[i].ChildQuestions.length; child++) {
                    if (this.postDataItems[i].ChildQuestions[child].QuestionId === parseInt(childObject.QuestionId)) {
                        if (childQuestion.TypeId === this.questiontype.DROPDOWN) {
                            this.postDataItems[i].ChildQuestions[child].Answer = '';
                            this.postDataItems[i].ChildQuestions[child].ChoiceId = answer;
                            this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index].SelectedID = answer;
                            for (let ch = 0; ch < childObject.Choices.length; ch++) {
                                if (childObject.Choices[ch].ChoiceId === answer) {
                                    this.postDataItems[i].ChildQuestions[child].Score = childObject.Choices[ch].Score;
                                    this.postDataItems[i].ChildQuestions[child].Answer = childObject.Choices[ch].ChoiceName;
                                }
                            }
                        } else if (childQuestion.TypeId === this.questiontype.RADIO) {
                            this.postDataItems[i].ChildQuestions[child].Answer = answer;
                            this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
                            this.postDataItems[i].ChildQuestions[child].Score = childChoice.Score;
                            this.assessmentSections[this.currentPage].Questions[this.qId]
                                .ChildQuestions[index].SelectedID = childChoice.ChoiceId;
                            // alert(this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index].SelectedID);
                        } else if (childQuestion.TypeId === this.questiontype.TEXTBOX) {
                            if (answer.length !== 0) {

                                this.postDataItems[i].ChildQuestions[child].Answer = answer;
                                this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
                                this.postDataItems[i].ChildQuestions[child].Score = 0;
                                this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index].SelectedValue = answer;
                            } else {
                                this.disableButton = true;
                            }

                        } else if (childQuestion.TypeId === this.questiontype.CHECKBOX) {
                            if (isChecked === true) {
                                for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
                                    if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
                                        // console.log(childQuestion.Choices[Ch]);
                                        this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index]
                                            .Choices[Ch].Checked = true;
                                        // console.log(this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index]);
                                    }
                                }
                                this.childCheckBoxArray.push(childChoice.ChoiceName);
                            } else {
                                for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
                                    if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
                                        this.assessmentSections[this.currentPage].Questions[this.qId]
                                            .ChildQuestions[index].Choices[Ch].Checked = false;
                                        // console.log(this.assessmentSections[this.currentPage].Questions[this.qId].ChildQuestions[index]);
                                    }
                                }
                                var index = this.childCheckBoxArray.indexOf(childChoice.ChoiceName);
                                this.childCheckBoxArray.splice(index, 1);
                            }
                            this.postDataItems[i].ChildQuestions[child].Answer = this.childCheckBoxArray.join();
                            this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
                            this.postDataItems[i].ChildQuestions[child].Score = 0;
                        }
                    }
                }
            }
        }
        //    console.log("postDataItems" + JSON.stringify(this.postDataItems));
    }
    // <-------posting data to database using api-------->
    save() {
        let severity: string;
        for (let i = 0; i < this.postDataItems.length; i++) {
            if (this.postDataItems[i].ChoiceId !== 0) {
                // alert(this.postDataItems[i].ChoiceId);
                if (this.postDataItems[i].IsAlert === true) {
                    // alert(this.postDataItems[i].IsAlert);
                    if (this.postDataItems[i].Score === 0) {
                        severity = 'Low';
                    } else if (this.postDataItems[i].Score === 1) {
                        severity = 'Medium';
                    } else {
                        severity = 'High';
                    }
                    this.alertsQuestionObject.push(
                        new AlertQuestionLevelModel(
                            this.postDataItems[i].AlertId,
                            this.postDataItems[i].QuestionId,
                            this.postDataItems[i].PatientAssessmentId,
                            'Clinical',
                            severity,
                            this.postDataItems[i].QuestionName,
                            this.clientid,
                            this.providerId,
                            'Client',
                            'Assessment',
                            this.providerName,
                            true,
                            this.scheduleDate,
                        )
                    );
                }
            }
        }
        //   console.log("alerts" + JSON.stringify(this.alertsQuestionObject));
        //   console.log("postDataItems" + JSON.stringify(this.postDataItems));
        this.assessmentRequest = {
            assessment: this.postDataItems,
            alert: this.alertsQuestionObject
        };
        console.log('assessment alert' + JSON.stringify(this.assessmentRequest));
        this._assessmentService.postCustomAssessment(this.assessmentRequest).subscribe(
            res => {
                // console.log(JSON.parse(JSON.stringify(res))._body);
                // this.message = (JSON.parse(JSON.stringify(res))._body);
                //   console.log(this.message);
                if (res.Success) {
                    this.success(res.data);
                } else {
                    this.errortost(res.data);
                }
            },
            err => this.error = console.log(err)
        );
    }
    enableSave() {
        this.disableButton = false;
    }
    nextButton() {
        if (this.currentPage <= this.totalNumberOfSection - 1) {
            this.currentPage++;
            this.assessmentSection = this.assessmentSections[this.currentPage];
        } else {
            this.currentPage = 0;
        }
    }
    prevButton() {
        //  this._assessmentService.postCustomAssessment(this.postDataItems).subscribe(
        //      res => {
        //          console.log(JSON.parse(JSON.stringify(res))._body);
        //      },
        //      err => console.log(err)
        //  );
        if (this.currentPage >= 0) {
            this.currentPage--;
            this.assessmentSection = this.assessmentSections[this.currentPage];
        } else {
            this.currentPage = 0;
        }
    }
    ExportToPdf(assessmentSections) {
        this.router.navigate(['coa/client/assessmentPdf',
            this.clientid, this.id]);
    }
    generatePDFfile() {
        // alert();
        let SurveyName = '';
        var imgpath = '../assets/img/accept.png';
        // alert(this.bikeImage )
        let columns = [
            { title: '', dataKey: 'QuestionName' },
            // { title: 'Selected Value', dataKey: 'SelectedValue' }
            // { title: "SurveyDescription", dataKey: "country" },

        ];
        let rows = [];
        // { "id": 1, "name": "Shaw", "country": "Tanzania" },
        // { "id": 2, "name": "Nelson", "country": "Kazakhstan" },
        // { "id": 3, "name": "Garcia", "country": "Madagascar" }
        this._assessmentService.getAssessmentData(this.id, this.clientid)
            .subscribe(arg => {
                this.assessmentData = arg.data;
                console.log(JSON.stringify((this.assessmentData)));

                let counter = 0;
                let questionCounter = 1;
                this.assessmentData.forEach(element => {
                    if (counter === 0) {
                        SurveyName = element.SurveyName;
                        // alert(SurveyName);
                    }
                    //   console.log(element);
                    element.Questions.forEach(que => {

                        let selectedItem: any;
                        let selected = que.SelectedValue;
                        if (que.SelectedValue === '') {
                            selectedItem = que.Choices.filter(function (item) {
                                return item.ChoiceId === que.SelectedID;
                            });
                            // console.log(selectedItem);
                            if (selectedItem.length > 0) { selected = selectedItem[0].ChoiceName; }
                            // console.log(selected);
                        }
                        // let allChoices = '';
                        // console.log(que.Choices);
                        // if (que.TypeName !== 'Textbox') {
                        //     que.Choices.forEach(choice => {

                        //         let ch = choice.ChoiceName;
                        //         if (selected === choice.ChoiceName) {
                        //             //   alert(choice.ChoiceName);
                        //             ch = choice.ChoiceName + '(' + choice.Score + ')' + '*';
                        //         }
                        //         allChoices += '\t\t' + ch + '\t';
                        //     });
                        // } else {
                        //     allChoices += '\t\t' + selected;
                        // }
                        rows.push({
                            'QuestionName': questionCounter + ')\t' + que.QuestionName
                            //  + '\n\n' + allChoices + '\n\n\n',
                            // 'SelectedValue': selected
                        });
                        let ch = '';
                        if (que.TypeName !== 'Textbox') {
                            que.Choices.forEach(choice => {
                                // let ch = choice.ChoiceName;
                                if (selected === choice.ChoiceName) {
                                    //   alert(choice.ChoiceName);
                                    ch += choice.ChoiceName + '(' + choice.Score + ')' + '*' + '\t';
                                } else {
                                    ch += choice.ChoiceName + '\t';
                                }
                            });
                        } else {
                            ch += selected;
                        }
                        rows.push({
                            'QuestionName': '\t\t' + ch + '\n'
                            //  + '\n\n' + allChoices + '\n\n\n',
                            // 'SelectedValue': selected
                        });
                        if (que.ChildQuestions.length > 0) {
                            let chQueCounter = 1;
                            que.ChildQuestions.forEach(chQue => {
                                let ChildselectedItem: any;
                                let Childselected = que.SelectedValue;
                                if (chQue.SelectedValue === '') {
                                    ChildselectedItem = chQue.Choices.filter(function (item) {
                                        return item.ChoiceId === chQue.SelectedID;
                                    });
                                    // console.log(selectedItem);
                                    if (ChildselectedItem.length > 0) { Childselected = ChildselectedItem[0].ChoiceName; }
                                    // console.log(selected);
                                }
                                rows.push({
                                    'QuestionName': '\t' + chQueCounter + ')\t' + chQue.QuestionName
                                    //  + '\n\n' + allChoices + '\n\n\n',
                                    // 'SelectedValue': selected
                                });
                                /***
                                 * child options -start
                                 */
                                let chChoices = '';
                                if (chQue.TypeName !== 'Textbox') {
                                    chQue.Choices.forEach(chQueChoice => {
                                        // chChoices += chQueChoice.ChoiceName + '\t';
                                        if (Childselected === chQueChoice.ChoiceName) {
                                            //   alert(choice.ChoiceName);
                                            chChoices += chQueChoice.ChoiceName + '(' + chQueChoice.Score + ')' + '*' + '\t';
                                        } else {
                                            chChoices += chQueChoice.ChoiceName + '\t';
                                        }
                                    });
                                } else {
                                    chChoices += Childselected;
                                }
                                rows.push({
                                    'QuestionName': '\t\t\t\t' + chChoices + '\n'
                                    //  + '\n\n' + allChoices + '\n\n\n',
                                    // 'SelectedValue': selected
                                });
                                /***
                                * child options -end
                                */
                                chQueCounter++;
                            });
                        }

                        // console.log(que);
                        questionCounter++;
                    });
                    counter++;
                });

                // let cols: any;
                // cols = Object.keys((this.assessmentData[0].Questions[0]));
                // alert();
                // console.log(cols);
                // let yyy = cols.Choices.filter(function (item) {
                //     item.ChoiceId === 994;
                // });
                // console.log(yyy);
                // alert();
                // Only pt supported (not mm or in)
                const doc = new jsPDF('p', 'pt');
                const rowData = []; let i = 0;
                doc.autoTable(columns, rows, {
                    // createdCell: function (cell, data) {
                    //     if (data.row.index === 0 || data.row.index === 2) {
                    //         cell.styles.fontStyle = 'bold';
                    //     }
                    // },
                    // drawCell: function (cell, opts) {
                    //     if (opts.column.dataKey === 5) {
                    //         rowData.push({
                    //             url: imgpath,
                    //             x: cell.textPos.x,
                    //             y: cell.textPos.y
                    //         });
                    //         i++;
                    //     }
                    // },
                    theme: 'grid', // 'grid', plain
                    printHeaders: false,
                    styles: {
                        // fillColor: [91, 62, 114],
                        // cellPadding: 3,
                        fontSize: 10,
                        valign: 'middle',
                        overflow: 'linebreak',
                        tableWidth: 'auto',
                        lineWidth: 0

                    },
                    headerStyles: {
                        //     // printHeaders: false,
                        //     columnWidth: 'wrap',
                        //     cellPadding: 2,
                        //     lineWidth: 0,
                        //     valign: 'top',
                        //     halign: 'left',    // 'center' or 'right'
                        fillColor: [255, 255, 255],
                        //     fontSize: 20,
                        //     columnHeight: 5
                    },
                    bodyStyles: {
                        // textColor: [30, 30, 30]
                    },
                    columnStyles: {
                        QuestionName: { fontStyle: 'bold' },
                        //  ChoiceName: { fontStyle:'bold'},

                    },
                    // rowspan: 2,
                    margin: { top: 80 },
                    addPageContent: function (data) {
                        doc.text(SurveyName, 250, 70);
                        // for (var i = 0; i < rowData.length; i++) {
                        //     doc.addImage(rowData[i].url, rowData[i].x, rowData[i].y, 20, 20);
                        // }
                    }
                });
                // doc.autoTable(columns, rows, {
                //     startY: doc.autoTable.previous.finalY + 15,
                //     // theme: 'grid',
                //     styles: {
                //         // fillColor: [91, 62, 114]
                //         // cellPadding: 3,
                //         // fontSize: 8,
                //         // valign: 'middle',
                //         // overflow: 'linebreak',
                //         // tableWidth: 'auto',
                //         // lineWidth: 0,
                //         overflow: 'hidden', columnWidth: 'wrap'
                //     },
                //     margin: { horizontal: 100 },
                //     headerStyles: {
                //         columnWidth: 'wrap',
                //         cellPadding: 2,
                //         lineWidth: 0,
                //         valign: 'top',
                //         halign: 'left',    // 'center' or 'right'
                //         fillColor: [91, 62, 114],
                //         fontSize: 8,
                //         // rowHeight: 20
                //     },
                //     bodyStyles: {
                //         // textColor: [30, 30, 30]
                //     },
                //     columnStyles: {
                //         // id: { fillColor: 255 }
                //         // { columnWidth: 150 }
                //         text: { columnWidth: 'auto' },
                //         id: { fontStyle: 'bold' }
                //     },
                //     // rowspan: 2,

                //     addPageContent: function (data) {
                //         doc.text('Assessments2', 110, doc.autoTable.previous.finalY + 5);
                //     }
                // });
                doc.save('Assessment.pdf');
            });


    }
    back() {
        this.isShowassessmentChange.emit(this.obj);
    }
    /** Toast messages for success and failure */
    success(successmsg) {
        this.toastr.success(successmsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.back();
            }, 2000);
            this.disableButton = true;
        });
    }
    errortost(errormsg) {
        this.toastr.error(errormsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                // this.getAssessment().add(() => {
                // });
            }, 3000);
        });
    }
}
export class AssessmentRequest {
    assessment: PatientQuestionModel[];
    alert: AlertQuestionLevelModel[];
}
export class Client {
    ClientId: number;
    ClientName: string;
    Gender: string;
    ProfileImage: string;
    LastUpdated: Date;
    DOB: Date;
    constructor(ClientId: number,
        ClientName: string,
        Gender: string,
        ProfileImage: string,
        LastUpdated: Date,
        DOB: Date) {
        this.ClientName = ClientName;
        this.Gender = Gender;
        this.ProfileImage = ProfileImage;
        this.LastUpdated = LastUpdated;
        this.LastUpdated = DOB;
    }
}
