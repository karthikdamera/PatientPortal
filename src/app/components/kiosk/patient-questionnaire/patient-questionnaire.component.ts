import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AssessmentService } from '../../person/assessments/assessments.service';
import { DatePipe } from '@angular/common';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { PatientQuestionModel, ChildQuestionModel } from '../../../models/assessment.model';

@Component({
    moduleId: module.id,
    selector: 'app-patient-questionnaire',
    templateUrl: 'patient-questionnaire.component.html',
    styleUrls: ['patient-questionnaire.component.scss'],
    providers: [AssessmentService, DatePipe]
})
export class PatientQuestionnaireComponent implements OnInit {
    // to show and hide assessments
    isView: boolean;
    // answer types
    questiontype = {
        'RADIO': 15,
        'DROPDOWN': 27,
        'TEXTBOX': 30,
        'CHECKBOX': 34
    };
    loading: boolean = false;
    buttonloading: boolean = true;
    // getting assessment
    assessmentData: any = [];
    // getting section by section
    assessmentSection: any = [];
    // to disable save button
    public disableButton: boolean;
    // for check box answers
    checkBoxArray: any = [];
    // for child check box answers
    childCheckBoxArray: any = [];
    // for section count
    totalNumberOfSection: number;
    // for next and previous buttons
    currentPage: number;
    // for child question index
    qId: number;
    // posting data in postDataItems
    postDataItems: PatientQuestionModel[] = [];
    // patientData: any = {};
    date: Date = new Date();
    userId: number;
    constructor(private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe,
        private route: ActivatedRoute, private _assessmentService: AssessmentService) {
        // this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.toastr.setRootViewContainerRef(vcr);
        this.disableButton = true;
        this.totalNumberOfSection = 0;
        this.currentPage = 0;
        this.userId = this.route.snapshot.queryParams['userId'];
    }
    /**
     * on page load for displaying questions and initializing post data object
     */
    ngOnInit() {
        this.isView = false;
        this.getAssessment().add(() => {
            this.totalNumberOfSection = this.assessmentData.length;
            this.assessmentSection = this.assessmentData[0];
            for (let section = 0; section < this.totalNumberOfSection; section++) {
                for (let i = 0; i < this.assessmentData[section].Questions.length; i++) {
                    const childObj: ChildQuestionModel[] = [];
                    let scoreValue = 0;
                    /**
                     * for parent question
                     */
                    if (this.assessmentData[section].Questions[i].SelectedID !== 0) {
                        // var string = this.assessmentData[section].Questions[i].SelectedValue;
                        const selectedValueArray = this.assessmentData[section].Questions[i].SelectedValue.split(',');
                        for (let j = 0; j < this.assessmentData[section].Questions[i].Choices.length; j++) {
                            if (this.assessmentData[section].Questions[i].SelectedID ===
                                this.assessmentData[section].Questions[i].Choices[j].ChoiceId) {
                                scoreValue = this.assessmentData[section].Questions[i].Choices[j].Score;
                            }
                            if (this.assessmentData[section].Questions[i].TypeName === 'Checkbox') {
                                for (let chkCh = 0; chkCh < selectedValueArray.length; chkCh++) {
                                    if (this.assessmentData[section].Questions[i].Choices[j].ChoiceName === selectedValueArray[chkCh]) {
                                        // this.checkBoxArray.push(array[chkCh]);
                                        this.assessmentData[section].Questions[i].Choices[j].Checked = true;
                                    }
                                }
                            }
                        }
                    }
                    /**
                    * for child question
                    */
                    for (let child = 0; child < this.assessmentData[section].Questions[i].ChildQuestions.length; child++) {
                        let childScoreValue = 0;
                        if (this.assessmentData[section].Questions[i].IsParent === true) {
                            // if child option are already been selected/saved in db
                            if (this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedID !== 0) {
                                // var childString = this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedValue;
                                const childArray = this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedValue.split(',');
                                for (let k = 0; k < this.assessmentData[section].Questions[i].
                                    ChildQuestions[child].Choices.length; k++) {
                                    if (this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedID ===
                                        this.assessmentData[section].Questions[i].ChildQuestions[child].Choices[k].ChoiceId) {
                                        childScoreValue = this.assessmentData[section].
                                            Questions[i].ChildQuestions[child].Choices[k].Score;
                                    }

                                    if (this.assessmentData[section].Questions[i].ChildQuestions[child].TypeName === 'Checkbox') {
                                        for (let chkCh = 0; chkCh < childArray.length; chkCh++) {
                                            if (this.assessmentData[section].Questions[i].ChildQuestions[child].
                                                Choices[k].ChoiceName === childArray[chkCh]) {
                                                this.assessmentData[section].Questions[i].
                                                    ChildQuestions[child].Choices[k].Checked = true;
                                            }
                                        }
                                    }
                                }
                            }

                            /**
                             * for child question post object
                             */
                            childObj.push(
                                new ChildQuestionModel(
                                    this.assessmentData[section].Questions[i].ChildQuestions[child].QuestionId,
                                    this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedID,
                                    this.assessmentData[section].Questions[i].ChildQuestions[child].TypeId,
                                    this.assessmentData[section].Questions[i].ChildQuestions[child].SelectedValue,
                                    childScoreValue,
                                    this.assessmentData[section].Questions[i].ChildQuestions[child].QuestionName
                                )
                            );
                        }
                    }
                    /**
                             * for parent question post object
                             */
                    const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                    this.postDataItems.push(
                        new PatientQuestionModel(
                            this.assessmentData[section].Questions[i].QuestionId,
                            this.assessmentData[section].Questions[i].AlertId,
                            this.assessmentData[section].Questions[i].SelectedID,
                            this.assessmentData[section].PatientAssessmentId,
                            this.assessmentData[section].UserId,
                            this.assessmentData[section].Questions[i].TypeId,
                            this.assessmentData[section].Questions[i].IsAlert,
                            this.assessmentData[section].Questions[i].SelectedValue,
                            fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds(),
                            this.assessmentData[section].UserId,
                            scoreValue,
                            this.assessmentData[section].SectionId,
                            this.assessmentData[section].Questions[i].QuestionName,
                            this.assessmentData[section].SectionName,
                            this.assessmentData[section].Questions[i].IsParent,
                            childObj
                        )
                    );
                }
            }
        });
    }
    /**
     * for hiding and viewing assessment
     */
    onViewClick() {
        this.isView = true;
    }
    /**
     * getting assessment dynamically from api
     */
    getAssessment() {
        return this._assessmentService.GetAssessments(this.userId, 0)
            .subscribe(arg => {
                if (arg.Success) {
                    this.assessmentData = arg.data;
                    console.log(JSON.stringify((this.assessmentData)));
                }
                else {
                    this.error(arg.data);
                }
            });

    }

    /**
     *  for options selection and what ever options we have
     * selected those are pushing to post data object
     * @param choice
     * @param answer
     * @param index
     * @param asmObject
     * @param isChecked
     */
    // onSelect(choice, answer, index, asmObject, isChecked, secindex) {
    //     this.checkBoxArray = [];
    //     console.log(this.assessmentData[secindex].Questions[index]);
    //     for (let i = 0; i < this.assessmentData[secindex].Questions[index].Choices.length; i++) {
    //         if (this.assessmentData[secindex].Questions[index].Choices[i].Checked === true) {
    //             this.checkBoxArray.push(this.assessmentData[secindex].Questions[index].Choices[i].ChoiceName);
    //         }
    //     }
    //     console.log('checkBoxArray', this.checkBoxArray);
    //     console.log('asmObject', asmObject);
    //     console.log('choice', choice);
    //     const question = asmObject.Questions[index];
    //     console.log('question', question);
    //     this.disableButton = false;
    //     /**
    //      * for drop down selection
    //      */
    //     for (let i = 0; i < this.postDataItems.length; i++) {
    //         if (this.postDataItems[i].QuestionId === question.QuestionId) {
    //             if (question.TypeId === this.questiontype.DROPDOWN) {
    //                 this.postDataItems[i].Answer = '';
    //                 this.postDataItems[i].ChoiceId = answer;
    //                 this.assessmentData[secindex].Questions[index].SelectedID = answer;
    //                 for (let ch = 0; ch < question.Choices.length; ch++) {
    //                     if (question.Choices[ch].ChoiceId === answer) {
    //                         this.postDataItems[i].Score = question.Choices[ch].Score;
    //                     }

    //                 }
    //                 /**
    //                 * for check box selection
    //                  */
    //             } else if (question.TypeId === this.questiontype.CHECKBOX) {
    //                 if (isChecked === true) {
    //                     // this.checkBoxArray.push(choice.ChoiceName);
    //                     for (let ch = 0; ch < question.Choices.length; ch++) {
    //                         if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
    //                             this.assessmentData[secindex].Questions[index].Choices[ch].Checked = true;
    //                             console.log(this.assessmentData[secindex].Questions[index].Choices[ch].Checked);
    //                         }
    //                     }
    //                     this.checkBoxArray.push(choice.ChoiceName);
    //                 } else {
    //                     for (let ch = 0; ch < question.Choices.length; ch++) {
    //                         if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
    //                             this.assessmentData[secindex].Questions[index].Choices[ch].Checked = false;
    //                             console.log(this.assessmentData[secindex].Questions[index].Choices[ch].Checked);
    //                         }
    //                     }
    //                     var index = this.checkBoxArray.indexOf(choice.ChoiceName);
    //                     this.checkBoxArray.splice(index, 1);
    //                 }
    //                 this.postDataItems[i].Answer = this.checkBoxArray.join();
    //                 this.postDataItems[i].ChoiceId = choice.ChoiceId;
    //                 this.postDataItems[i].Score = 0;
    //             }
    //             /**
    //              * for radio selection
    //              */
    //             else if (question.TypeId === this.questiontype.RADIO) {
    //                 this.postDataItems[i].Answer = answer;
    //                 this.postDataItems[i].ChoiceId = choice.ChoiceId;
    //                 this.postDataItems[i].Score = choice.Score;
    //                 this.assessmentData[secindex].Questions[index].SelectedID = choice.ChoiceId;
    //             }
    //             /**
    //              * for text box selection
    //              */
    //             else if (question.TypeId === this.questiontype.TEXTBOX) {
    //                 if (answer.length !== 0) {
    //                     this.postDataItems[i].Answer = answer;
    //                     this.postDataItems[i].ChoiceId = choice.ChoiceId;
    //                     this.postDataItems[i].Score = 0;
    //                     this.assessmentData[secindex].Questions[index].SelectedValue = answer;
    //                 } else {
    //                     this.disableButton = true;
    //                 }
    //             }
    //         }
    //     }
    //     console.log('postDataItems' + JSON.stringify(this.postDataItems));
    // }
    onSelect(choice, answer, index, asmObject, isChecked) {
        this.checkBoxArray = [];
        console.log(this.assessmentData[this.currentPage].Questions[index]);
        for (let i = 0; i < this.assessmentData[this.currentPage].Questions[index].Choices.length; i++) {
            if (this.assessmentData[this.currentPage].Questions[index].Choices[i].Checked === true) {
                this.checkBoxArray.push(this.assessmentData[this.currentPage].Questions[index].Choices[i].ChoiceName);
            }
        }
        console.log('checkBoxArray', this.checkBoxArray);
        console.log('asmObject', asmObject);
        console.log('choice', choice);
        const question = asmObject.Questions[index];
        console.log('question', question);
        this.disableButton = false;
        // <--------for selecting options without duplicates---------->
        for (let i = 0; i < this.postDataItems.length; i++) {
            if (this.postDataItems[i].QuestionId === question.QuestionId) {
                if (question.TypeId === this.questiontype.DROPDOWN) {
                    this.postDataItems[i].Answer = '';
                    this.postDataItems[i].ChoiceId = answer;
                    this.assessmentData[this.currentPage].Questions[index].SelectedID = answer;
                    for (let ch = 0; ch < question.Choices.length; ch++) {
                        if (question.Choices[ch].ChoiceId === answer) {
                            this.postDataItems[i].Score = question.Choices[ch].Score;
                        }

                    }

                } else if (question.TypeId === this.questiontype.CHECKBOX) {
                    if (isChecked === true) {
                        // this.checkBoxArray.push(choice.ChoiceName);
                        for (let ch = 0; ch < question.Choices.length; ch++) {
                            if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
                                this.assessmentData[this.currentPage].Questions[index].Choices[ch].Checked = true;
                                console.log(this.assessmentData[this.currentPage].Questions[index].Choices[ch].Checked);
                            }
                        }
                        this.checkBoxArray.push(choice.ChoiceName);
                    } else {
                        for (let ch = 0; ch < question.Choices.length; ch++) {
                            if (choice.ChoiceId === question.Choices[ch].ChoiceId) {
                                this.assessmentData[this.currentPage].Questions[index].Choices[ch].Checked = false;
                                console.log(this.assessmentData[this.currentPage].Questions[index].Choices[ch].Checked);
                            }
                        }
                        var index = this.checkBoxArray.indexOf(choice.ChoiceName);
                        this.checkBoxArray.splice(index, 1);
                    }
                    this.postDataItems[i].Answer = this.checkBoxArray.join();
                    this.postDataItems[i].ChoiceId = choice.ChoiceId;
                    this.postDataItems[i].Score = 0;
                } else if (question.TypeId === this.questiontype.RADIO) {
                    this.postDataItems[i].Answer = answer;
                    this.postDataItems[i].ChoiceId = choice.ChoiceId;
                    this.postDataItems[i].Score = choice.Score;
                    this.assessmentData[this.currentPage].Questions[index].SelectedID = choice.ChoiceId;
                } else if (question.TypeId === this.questiontype.TEXTBOX) {
                    if (answer.length !== 0) {
                        this.postDataItems[i].Answer = answer;
                        this.postDataItems[i].ChoiceId = choice.ChoiceId;
                        this.postDataItems[i].Score = 0;
                        this.assessmentData[this.currentPage].Questions[index].SelectedValue = answer;
                    } else {
                        this.disableButton = true;
                    }
                }
            }
        }
        console.log('postDataItems' + JSON.stringify(this.postDataItems));
    }
    /**
     *
     *  for child options selection and what ever options we have
      * selected those are pushing to post data object
     * @param answer
     * @param childObject
     * @param questionId
     * @param isChecked
     * @param index
     */
    // onSelectChild(childChoice, answer, childObject, questionId, isChecked, index, secindex) {
    //     for (let section = 0; section < this.totalNumberOfSection; section++) {
    //         for (let i = 0; i < this.assessmentData[section].Questions.length; i++) {
    //             if (questionId === this.assessmentData[section].Questions[i].QuestionId) {
    //                 this.qId = i;
    //             }
    //         }
    //     }
    //     this.childCheckBoxArray = [];
    //     for (let l = 0; l < this.assessmentData[secindex].Questions[this.qId].ChildQuestions[index].Choices.length; l++) {
    //         if (this.assessmentData[secindex].Questions[this.qId].ChildQuestions[index].Choices[l].Checked === true) {
    //             this.childCheckBoxArray.push(this.assessmentData[secindex].Questions[this.qId].
    //                 ChildQuestions[index].Choices[l].ChoiceName);
    //         }
    //     }
    //     const childQuestion = childObject;
    //     console.log('childQuestion', childQuestion);
    //     this.disableButton = false;
    //     for (let i = 0; i < this.postDataItems.length; i++) {
    //         if (this.postDataItems[i].QuestionId === parseInt(questionId)) {
    //             for (let child = 0; child < this.postDataItems[i].ChildQuestions.length; child++) {
    //                 if (this.postDataItems[i].ChildQuestions[child].QuestionId === parseInt(childObject.QuestionId)) {
    //                     /**
    //                      * for drop down selection
    //                      */
    //                     if (childQuestion.TypeId === this.questiontype.DROPDOWN) {
    //                         this.postDataItems[i].ChildQuestions[child].Answer = '';
    //                         this.postDataItems[i].ChildQuestions[child].ChoiceId = answer;
    //                         this.assessmentData[secindex].Questions[this.qId].ChildQuestions[index].SelectedID = answer;
    //                         for (let ch = 0; ch < childObject.Choices.length; ch++) {
    //                             if (childObject.Choices[ch].ChoiceId === answer) {
    //                                 this.postDataItems[i].ChildQuestions[child].Score = childObject.Choices[ch].Score;
    //                                 this.postDataItems[i].ChildQuestions[child].Answer = childObject.Choices[ch].ChoiceName;
    //                             }
    //                         }
    //                     }
    //                     /**
    //                      *for radio selection
    //                      */
    //                     else if (childQuestion.TypeId === this.questiontype.RADIO) {
    //                         this.postDataItems[i].ChildQuestions[child].Answer = answer;
    //                         this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
    //                         this.postDataItems[i].ChildQuestions[child].Score = childChoice.Score;
    //                         this.assessmentData[secindex].Questions[this.qId].
    //                             ChildQuestions[index].SelectedID = childChoice.ChoiceId;
    //                     }
    //                     /**
    //                      * for text box selection
    //                      */
    //                     else if (childQuestion.TypeId === this.questiontype.TEXTBOX) {
    //                         if (answer.length !== 0) {
    //                             this.postDataItems[i].ChildQuestions[child].Answer = answer;
    //                             this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
    //                             this.postDataItems[i].ChildQuestions[child].Score = 0;
    //                             this.assessmentData[secindex].Questions[this.qId].ChildQuestions[index].SelectedValue = answer;
    //                         } else {
    //                             this.disableButton = true;
    //                         }
    //                     }
    //                     /**
    //                      * for check box selection
    //                      */
    //                     else if (childQuestion.TypeId === this.questiontype.CHECKBOX) {
    //                         if (isChecked === true) {
    //                             for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
    //                                 if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
    //                                     // console.log(childQuestion.Choices[Ch]);
    //                                     this.assessmentData[secindex].Questions[this.qId].
    //                                         ChildQuestions[index].Choices[Ch].Checked = true;
    //                                 }
    //                             }
    //                             this.childCheckBoxArray.push(childChoice.ChoiceName);
    //                         } else {
    //                             for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
    //                                 if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
    //                                     this.assessmentData[secindex].Questions[this.qId].
    //                                         ChildQuestions[index].Choices[Ch].Checked = false;
    //                                 }
    //                             }
    //                             var index = this.childCheckBoxArray.indexOf(childChoice.ChoiceName);
    //                             this.childCheckBoxArray.splice(index, 1);
    //                         }
    //                         this.postDataItems[i].ChildQuestions[child].Answer = this.childCheckBoxArray.join();
    //                         this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
    //                         this.postDataItems[i].ChildQuestions[child].Score = 0;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     console.log('postDataItems' + JSON.stringify(this.postDataItems));
    // }

    onSelectChild(childChoice, answer, childObject, questionId, isChecked, index) {
        for (let section = 0; section < this.totalNumberOfSection; section++) {
            for (let i = 0; i < this.assessmentData[section].Questions.length; i++) {
                if (questionId === this.assessmentData[section].Questions[i].QuestionId) {
                    this.qId = i;
                }
            }
        }
        this.childCheckBoxArray = [];
        for (let l = 0; l < this.assessmentData[this.currentPage].Questions[this.qId].ChildQuestions[index].Choices.length; l++) {
            if (this.assessmentData[this.currentPage].Questions[this.qId].ChildQuestions[index].Choices[l].Checked === true) {
                this.childCheckBoxArray.push(this.assessmentData[this.currentPage].Questions[this.qId].
                    ChildQuestions[index].Choices[l].ChoiceName);
            }
        }
        const childQuestion = childObject;
        console.log('childQuestion', childQuestion);
        this.disableButton = false;
        for (let i = 0; i < this.postDataItems.length; i++) {
            if (this.postDataItems[i].QuestionId === parseInt(questionId)) {
                for (let child = 0; child < this.postDataItems[i].ChildQuestions.length; child++) {
                    if (this.postDataItems[i].ChildQuestions[child].QuestionId === parseInt(childObject.QuestionId)) {
                        if (childQuestion.TypeId === this.questiontype.DROPDOWN) {
                            this.postDataItems[i].ChildQuestions[child].Answer = '';
                            this.postDataItems[i].ChildQuestions[child].ChoiceId = answer;
                            this.assessmentData[this.currentPage].Questions[this.qId].ChildQuestions[index].SelectedID = answer;
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
                            this.assessmentData[this.currentPage].Questions[this.qId].
                                ChildQuestions[index].SelectedID = childChoice.ChoiceId;
                        } else if (childQuestion.TypeId === this.questiontype.TEXTBOX) {
                            if (answer.length !== 0) {

                                this.postDataItems[i].ChildQuestions[child].Answer = answer;
                                this.postDataItems[i].ChildQuestions[child].ChoiceId = childChoice.ChoiceId;
                                this.postDataItems[i].ChildQuestions[child].Score = 0;
                                this.assessmentData[this.currentPage].Questions[this.qId].ChildQuestions[index].SelectedValue = answer;
                            } else {
                                this.disableButton = true;
                            }

                        } else if (childQuestion.TypeId === this.questiontype.CHECKBOX) {
                            if (isChecked === true) {
                                for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
                                    if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
                                        // console.log(childQuestion.Choices[Ch]);
                                        this.assessmentData[this.currentPage].Questions[this.qId].
                                            ChildQuestions[index].Choices[Ch].Checked = true;
                                    }
                                }
                                this.childCheckBoxArray.push(childChoice.ChoiceName);
                            } else {
                                for (let Ch = 0; Ch < childQuestion.Choices.length; Ch++) {
                                    if (childChoice.ChoiceId === childQuestion.Choices[Ch].ChoiceId) {
                                        this.assessmentData[this.currentPage].Questions[this.qId].
                                            ChildQuestions[index].Choices[Ch].Checked = false;
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
        console.log('postDataItems' + JSON.stringify(this.postDataItems));
    }
    /**
     * posting data to database using api
     */
    assessmentPost() {
        this.buttonloading = false;
        this.loading = true;
        console.log('postDataItems' + JSON.stringify(this.postDataItems));
        this._assessmentService.assessmentPost(this.postDataItems).subscribe(
            res => {
                console.log(('post service' + JSON.stringify(res)));
                if (res.Success) {
                    this.getAssessment();
                    this.disableButton = true;
                    this.success('Assessment submitted successfully');
                } else {
                    this.error('Assessment is not submitted');
                }
            },
            err => err
        );

    }
    /**
     * after selecting alteast one option save button enabling
     */
    enableSave() {
        this.disableButton = false;
    }
    /**
     * for next button
     */
    nextButton() {
        if (this.currentPage <= this.totalNumberOfSection - 1) {
            this.currentPage++;
            this.assessmentSection = this.assessmentData[this.currentPage];
        } else {
            this.currentPage = 0;
        }
    }
    /**
     * for previous button
     */
    prevButton() {

        if (this.currentPage >= 0) {
            this.currentPage--;
            this.assessmentSection = this.assessmentData[this.currentPage];
        } else {
            this.currentPage = 0;
        }
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
            this.loading = false;
            this.buttonloading = true;
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                this.router.navigate(['/kiosk/home']);
                // this.getAssessment().add(() => {
                // });
            }, 3000);
        });
    }
    error(errormsg) {
        this.toastr.error(errormsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            this.loading = false;
            this.buttonloading = true;
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                // this.getAssessment().add(() => {
                // });
            }, 3000);
        });
    }
}
