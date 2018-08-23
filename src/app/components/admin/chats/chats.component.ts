import { DatePipe } from '@angular/common';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chats.service';
import { ChatModel, CreateGroup, PushArrayData, PostGroupInfo } from './../../../models/chat.model';
import { ValidationService } from '../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
declare var jQuery: any;
@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.scss'],
    providers: [DatePipe, ChatService, ToastsManager]
})
export class ChatsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    @ViewChild('addProvider') public addProvider: ModalDirective;
    @ViewChild('editProvider') public editProvider: ModalDirective;
    error: any;
    disableButton: boolean;
    errmsg: boolean;
    success: boolean;
    editstatus: boolean;
    addicon: string;
    editItems: PostGroupInfo;
    updategroups: PostGroupInfo;
    DatePipe: any;
    providerarray = [];
    profileimage: string;
    chatarray = [];
    disabledoption: boolean = false;
    model: CreateGroup;
    providernumber = [];
    editicon: string;
    groupsarray = [];
    adminData: any = {};
    GroupForm: any;
    GroupForm1: any;
    postgroup: PostGroupInfo;
    pushproviderdata: PushArrayData;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    constructor(private changeDetectorRef: ChangeDetectorRef, public toastr: ToastsManager,vRef: ViewContainerRef,
        private router: Router, private Chat_service: ChatService, public datepipe: DatePipe, private formBuilder: FormBuilder) {
        this.model = new CreateGroup();
        this.editItems = new PostGroupInfo();
        this.pushproviderdata = new PushArrayData();
       // this.toastr.setRootViewContainerRef(vcr);
        this.postgroup = new PostGroupInfo();
        this.updategroups = new PostGroupInfo();
        this.adminData = JSON.parse(localStorage.getItem('loginData'));
        // console.log(this.adminData);
        this.profileimage = '';
        this.GroupForm = this.formBuilder.group({
            'GroupIcon': [''],
            'GroupName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'providerlist': ['']
        });
        this.GroupForm1 = this.formBuilder.group({
            'GroupIcon': [''],
            'GroupName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'providerlist': ['']
        });
        this._rootViewContainerRef = vRef;
    }

    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getdata();
        this.getchatlist();
    }

    toClear() {
        this.model = new CreateGroup();
        this.file_srcs = [];
        this.profileimage = '';
    }
    edit(chats) {
        this.addicon = '';
        this.editicon = '';
        this.editItems = new PostGroupInfo();
        this.file_srcs = [];
        this.editItems = chats;
   //     console.log(chats);
        if (chats.Icon === '') {
           // alert();
            this.editicon = '';
        } else if (chats.Icon !== null) {
           // alert('aaaaa');
            this.editicon =  chats.Icon;

        }
        this.editstatus = true;
      //  console.log(this.editItems[0]);
        if (chats.Numbers.length > 0) {
            for (let j = 0; j <= chats.Numbers.length - 1; j++ ) {
                    for (let i = 0; i <= this.chatarray.length - 1; i++) {
                    if (this.chatarray[i].FriendlyName === chats.Numbers[j].Name) {
                        this.chatarray.splice(i, 1);
                    }

            }
        }
        }

    }

    postproviders(model) {
        if (this.GroupForm.dirty && this.GroupForm.valid) {
         //   console.log(this.model);
            // alert(JSON.stringify(this.model));
            this.Chat_service.postproviders(this.model).subscribe(
                res => {
                    this.disableButton = true;
                 //   console.log((JSON.stringify(res)));
                    // this conditions are used for hiding and unhiding forms
                    if (res.Success) {
                        this.Success('Provider added successfully', 'add');
                    } else {
                        this.Error(res.data, 'add');
                    }
                });
        }
    }


    // editPost(editItems) {
    //     if (( this.GroupForm.dirty && this.GroupForm.valid )) {
    //     // this.editItems.DesignationId = editItems.DesignationId;
    //    // this.editItems.Date = this.model.Date;
    //    // console.log('Date' + this.editItems.Date);
    //    // this.editItems.UserName = this.adminData.FirstName + this.adminData.LastName;
    //     // if (this.model.ImageUrl === '') {
    //     //     this.editItems.ImageUrl = this.profileimage.replace('data:image/jpeg;base64,', '');
    //     // } else {
    //     //     this.editItems.ImageUrl = this.model.ImageUrl;
    //     // }
    //     console.log(JSON.stringify(editItems));

    //     this.Chat_service.SaveProviderInfo (editItems).subscribe(
    //         res => {
    //             this.disableButton = true;
    //             console.log((JSON.stringify(res)));
    //             // this conditions are used for hiding and unhiding forms
    //             if (res.Success) {
    //                 this.Success('Provider updated successfully', 'edit');
    //             } else {
    //                 this.error(res.data, 'edit');
    //             }

    //         });
    // }
    // }
    DeleteGroupdata(data, index) {
        let providername: string;
        let providernumber: string;
        providername = data.Name;
        providernumber = data.Number;
        this.providerarray.splice(index, 1);
        this.chatarray.push(
            { Sid: '', FriendlyName: providername, PhoneNumber: providernumber });
    }
    DeleteeditGroupdata(data, index) {
        let providername: string;
        let providernumber: string;
        providername = data.Name;
        providernumber = data.Number;
        this.editItems.Numbers.splice(index, 1);
       // this.providerarray.splice(index, 1);
        this.chatarray.push(
            { Sid: '', FriendlyName: providername, PhoneNumber: providernumber });
    }
    fileChange(input) {
        // this.profileimage = '';
        this.file_srcs = [];
        // this.model.ImageUrl = '';
        var filePath = input.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            // alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
            input.value = '';
            return false;
        } else {
            this.readFiles(input.files);
        }
    }
    readFile(file, reader, callback) {
        // Set a callback funtion to fire after the file is fully loaded
        reader.onload = () => {
            // callback with the results
            callback(reader.result);
        };
        // Read the file
        reader.readAsDataURL(file);
    }
    readFiles(files, index = 0) {
        // Create the file reader
        let reader = new FileReader();
        // If there is a file
        if (index in files) {
            // Start reading this file
            this.readFile(files[index], reader, (result) => {
                // Create an img element and add the image file data to it
                var img = document.createElement('img');
                img.src = result;
                // Send this img to the resize function (and wait for callback)
                this.resize(img, 250, 250, (resized_jpeg, before, after) => {
                    // For debugging (size in bytes before and after)
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview
                    // This is also the file you want to upload. (either as a
                    // base64 string or img.src = resized_jpeg if you prefer a file).
                    this.file_srcs.pop();
                    this.file_srcs.push(resized_jpeg);
                    // this.profileimage = this.file_srcs[0];
                    this.addicon = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
                    // console.log(this.model.ImageUrl);
                    // Read the next file;
                    this.readFiles(files, index + 1);
                    // this.onlyimageupload();
                });
            });
        } else {
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    }

    resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
        // This will wait until the img is loaded before calling this function
        return img.onload = () => {
        //    console.log('img loaded');
            // Get the images current width and height
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object
            var canvas = document.createElement('canvas');
            // Set the canvas to the new calculated dimensions
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg
            // IMPORTANT: 'jpeg' NOT 'jpg'
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }

    getdata() {
        return this.Chat_service.getproviderList().subscribe(res => {
            this.chatarray = res.data;
         //   console.log(this.chatarray);
        });
    }
    chatlayout() {
        this.router.navigate(['./admin/chats/ChatLayout']);
    }
    pushproviders() {
        // console.log(this.pushproviderdata.ProviderName);
        for (let i = 0; i < this.chatarray.length; i++) {
            if (this.chatarray[i].Sid === this.pushproviderdata.providerId) {
                this.pushproviderdata.ProviderName = this.chatarray[i].FriendlyName;
                this.pushproviderdata.PhoneNumber = this.chatarray[i].PhoneNumber;
                this.pushproviderdata.Sid = this.chatarray[i].Sid;
                if (this.editstatus === true) {
                    this.editItems.Numbers.push
                        ({ Id: 0, Name: this.pushproviderdata.ProviderName, Number: this.pushproviderdata.PhoneNumber });
                } else {
                    this.providerarray.push({ Id: 0, Name: this.pushproviderdata.ProviderName, Number: this.pushproviderdata.PhoneNumber });
                }
                this.chatarray.splice(i, 1);
            }
            this.disabledoption = this.chatarray[i].FriendlyName;
        }

        this.disabledoption = true;
    }
    getchatlist() {
        return this.Chat_service.getOrganizations().subscribe(res => {
            this.groupsarray = res.data.GroupNames;
            for (let i = 0 ; i <= this.groupsarray.length - 1 ; i++) {
                this.groupsarray[i].Icon += '?random+\=' + Math.random();
            }
         //   console.log(this.groupsarray);
        });
    }


    postProviderInfo() {
        if (this.providerarray.length >= 1) {
            let date: Date;
            date = new Date();
            const currentdate = this.datepipe.transform(date, 'dd/MMM/yyyy');
            this.postgroup.Date = currentdate;
            this.postgroup.UserId = this.adminData.Id;
            this.postgroup.Icon = this.addicon;
            this.postgroup.Numbers = this.providerarray;
        //    console.log(JSON.stringify(this.postgroup));
            this.Chat_service.postproviders(this.postgroup).subscribe(res => {
                if (res.success = true) {
                    this.Success('Group Added Successfully', 'add')
                }
                else {
                    this.Error(res.data, '')
                }
            });
        }
        else {
            this.Error('please select atleast one provider', '');
        }
    }
    updateproviders(editItems) {
        if (this.editItems.Numbers.length >= 1) {
            let date: Date;
            date = new Date();
            const currentdate = this.datepipe.transform(date, 'dd/MMM/yyyy');
            this.editItems.Id = this.editItems.Id;
            this.editItems.Date = currentdate;
            this.editItems.UserId = this.adminData.Id;
            if (this.addicon != '') {
                this.editItems.Icon = this.addicon;
            } else {
                this.editItems.Icon = '';
            }
            this.editItems.Numbers = this.editItems.Numbers;
        //    console.log(this.editItems);
            this.editItems.IsActive=true;
            this.Chat_service.postproviders(this.editItems).subscribe(res => {
                if (res.success = true) {
                    this.Success('Group Updated Successfully', 'update')
                }
                else {
                    this.Error(res.data, '')
                }
            });
        }
        else {
            this.Error('please select atleast one provider', '');
        }

    }
    cancel() {
        this.providerarray = [];
        this.postgroup = new PostGroupInfo();
        this.getdata();
        this.pushproviderdata.providerId = '';
    }
    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    Success(successmsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.toastr.success(successmsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                if (type === 'add') {
                   // jQuery('#addProvider').modal('hide');
                    this.postgroup = new PostGroupInfo();
                }
                if (type === 'update') {
                    // jQuery('#editProvider').modal('hide');
                    this.editstatus = false;
                  //  this.editItems = new PostGroupInfo();
                }
                this.addProvider.hide();
            this.editProvider.hide();
                this.getchatlist().add(() => {
                    this.model = new CreateGroup();
                });


            }, 2000);
        });
    }
    Error(errormsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
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
                // if (type === 'add') {
                //     jQuery('#addStaff').modal('hide');
                // }
                // if (type === 'update') {
                //     jQuery('#myModal1').modal('hide');
                // }

            }, 2000);
        });
    }
}
