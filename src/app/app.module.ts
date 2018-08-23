
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
 import { NotfoundComponent } from './auth/notfound/notfound.component';
 import { AuthGuard } from './auth/auth.guard';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { AppComponent } from './app.component';
 import { FormsModule} from '@angular/forms';
 import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
 import { HttpClientModule } from '@angular/common/http';
 import { routing } from './app.route';
 import { LoaderComponent } from './shared/loader/loader.component';
 import { LoaderService } from './shared/loader/loaderservice';
 import { HttpClient } from './shared/services/httpClient.service';
 import { FormscontrolComponent } from './components/formscontrol/formscontrol.component';
 import { CommonService } from './shared/services/common.service';
 import { AuthService } from './auth/auth.service';
 import { AuthModule } from './auth/auth.module';
 import { BmiComponentModule } from './shared/components/bmi-component/bmi-component.module';
 import { SliderComponentModule } from './shared/components/slider-component/slider-component.module';
 import { OrderModule } from 'ngx-order-pipe';
 @NgModule({
   declarations: [
     AppComponent,
     LoaderComponent,
     NotfoundComponent,
     FormscontrolComponent
   ],
   exports: [
     LoaderComponent
   ],
   imports: [
     BrowserModule,
     BrowserAnimationsModule,
     FormsModule,
     routing,
     HttpModule,
     HttpClientModule,
     AuthModule,
    //  OrderModule
   ],
   providers: [
     AuthGuard,
     LoaderService,
     CommonService,
     AuthService,
   ],
   bootstrap: [AppComponent],
   schemas: [NO_ERRORS_SCHEMA]
 })
 export class AppModule { }
