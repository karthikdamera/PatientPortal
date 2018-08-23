import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { SlotbookingService } from "../../admin/slot-booking/slot-booking.service";
import { AppointmentService } from "../../person/my-appontments/my-appointment.service";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastsManager, Toast } from "ng2-toastr";
import { PersonRequestService } from "../person-requests.service";
import { post } from "selenium-webdriver/http";
import { ModalDirective } from "angular-bootstrap-md";
import { AppointmentModel } from "../../../models/appointments.model";
declare var jQuery: any;

@Component({
  selector: "app-appointment-cancel",
  templateUrl: "./appointment-cancel.component.html",
  styleUrls: ["./appointment-cancel.component.scss"],
  providers: [
    AppointmentService,
    SlotbookingService,
    DatePipe,
    PersonRequestService
  ]
})
export class AppointmentCancelComponent implements OnInit {
  @ViewChild("CancelAppointmentInPerson")
  public CancelAppointmentInPerson: ModalDirective;
  postDateFormat = "dd/MMM/yyyy";
  patientData: any = {};
  slotfromtime: any;
  // appointmentmodel:AppointmentModel;
  Imageshow: boolean;
  slotid: number;
  slotdate: any;
  cancelstatus: boolean;
  appointmentData: AppointmentModel;
  model: any = {
    PatientId: "",
    slotdate: "",
    slotfromtime: "",
    slottotime: "",
    providername: "",
    bookedslotID: "" ,
    Reason : ''
  };
  routingobject: any = { bookedslotID: "" };
  CancelSlotId: any;
  constructor(
    private _myappointmnetService: AppointmentService,
    private router: ActivatedRoute,
    public _slotbookingService: SlotbookingService,
    private route: Router,
    public datepipe: DatePipe,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private _Requestservice: PersonRequestService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.router.queryParams.subscribe(params => {
      if (params["Guid"]) {
        // this.changeslotid = params['ChangeSlotId'];
        this.CancelSlotId = params["Guid"];
      }
    });
    this.cancelstatus = true;
    this.appointmentData = new AppointmentModel();
  }

  ngOnInit() {
    this.getMyappointmnets();
  }

  getMyappointmnets() {
    // let date: any;
    // date = new Date();
    // const currentdata = this.datepipe.transform(date, this.postDateFormat);
    // const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    //   return this._myappointmnetService.GetAppoinments(673, currenttime).subscribe(
    //       res => {
    //           console.log('appointmnet data' + (JSON.stringify(this.appointmentData = res.data)));
    //       }
    //   );
    return this._Requestservice
      .getslotsbyguid(this.CancelSlotId)
      .subscribe(res => {
        console.log(
          "appointmnet data" + JSON.stringify((this.appointmentData = res.data))
        );
        if (this.appointmentData.PatientImage === "") {
          this.Imageshow = true;
        } else {
          this.Imageshow = false;
        }
      });
  }

  cancel(slotinfo) {
    //  alert();
   // console.log(JSON.stringify(slotinfo));
    // this.model.bookedslotID = slotinfo.Id;
    // this.model.slotdate = slotinfo.Date;
    // this.model.slotfromtime = slotinfo.FromTime;
    // this.model.slottotime = slotinfo.ToTime;
    // this.model.providername = slotinfo.ProviderName;
    // this.model.PatientId = slotinfo.PersonId;
    this.CancelAppointmentInPerson.show();
  }
  cancelappointment() {
    // alert(this.model.bookedslotID);
    //    const InputInfo = {
    //      PersonId: 673,
    //      BookedSlotId: this.model.bookedslotID
    //  };
    return this._Requestservice.getslotsbyguid(this.CancelSlotId)
      .subscribe(getres => {
        console.log(JSON.stringify(getres));
     // alert(getres.data.BookingStatus);
        if (getres.data.BookingStatus === 'Booked') {
          let post = {
            Guid: this.CancelSlotId,
            Reason : this.model.Reason
          };
          console.log(JSON.stringify(post));
          this._Requestservice.cancelslotsbyguid(post).subscribe(res => {
            console.log(JSON.stringify(res));
            if (res.Success) {
              this.CancelAppointmentInPerson.hide();
            //  this.success("Your Appointment has been canceled");
              this.cancelstatus = false;
            } else {
              this.error(res.data);
              console.log(res);
            }
          });
        } else {
          this.appointmentData = getres.data;
        }
      });
  }
  success(successmsg) {
    this.toastr
      .success(successmsg, null, {
        dismiss: "controlled",
        showCloseButton: true,
        positionClass: "toast-bottom-right",
        newestOnTop: true,
        progressBar: false,
        showEasing: "swing",
        closeButton: false,
        preventDuplicates: false,
        debug: false,
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      })
      .then((toast: Toast) => {
        this.CancelAppointmentInPerson.hide();
       // this.getMyappointmnets();
        // this.slotdate();
        setTimeout(() => {
          this.toastr.dismissToast(toast);
        }, 3000);
      });
  }
  error(errormsg) {
    this.toastr
      .error(errormsg, null, {
        dismiss: "controlled",
        showCloseButton: true,
        positionClass: "toast-bottom-right",
        newestOnTop: true,
        progressBar: false,
        showEasing: "swing",
        closeButton: false,
        preventDuplicates: false,
        debug: false,
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
        }, 3000);
      });
  }
}
