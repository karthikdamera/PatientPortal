import { LoginComponent } from './login/login.component';

import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
export const routes: Routes =
[
    { path: 'login', component: LoginComponent  },
    { path: 'forgot', component: ForgotComponent },
    { path: 'reset', component: ResetpasswordComponent },

];

export const routing = RouterModule.forChild(routes);
