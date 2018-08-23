import { AdminBaseService } from './../components/admin/adminBaseService';
import { Config } from './../../environments/environment';
import {
  HttpClient,
  HTTPDefaultResponse
} from './../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 

@Injectable()
export class AuthService extends AdminBaseService {
  // useful for redirect after login
  public redirectUrl: string;
  // for recording login status
  private isLoggedin = false;
  constructor(private http: HttpClient) {
    super(http);
  }

  // User data
  private user: any = {};
  /**
   * user login: Check with username and password
   * @param username
   * @param password
   */
  public LoginUser(
    username: string,
    password: string
  ): Observable<AuthRespose> {
    const clientDetails =
      'client_id=' +
      Config.CLIENT_ID +
      '&client_secret=' +
      Config.CLIENT_SECRET;
    const data =
      clientDetails +
      '&grant_type=' +
      Config.GRANT_TYPE +
      '&username=' +
      username +
      '&password=' +
      password;

    return (
      this.http
        .post('oauth/token', data, false, false, true)
        .map((response: Response) => {
          const rawResponse: any = <any>response;

          const currentResponse = new AuthRespose();
          if (
            rawResponse.access_token != null ||
            rawResponse.access_token !== undefined
          ) {
            // alert('hi');
            // console.log(rawResponse.access_token);
            currentResponse.error = null;
            currentResponse.isLoginSuccessful = true;
            currentResponse.access_token = rawResponse.access_token;
            this.isLoggedin = true;
          } else {
            currentResponse.error = 'Incorrect username or password';
            currentResponse.isLoginSuccessful = false;
            currentResponse.access_token = undefined;
          }
          return currentResponse;
        })
        // tslint:disable-next-line:no-shadowed-variable
        .do(data => {
          // console.log(data);
          // if (data.isLoginSuccessful) {
          //   localStorage.removeItem(Config.ID_TOKEN);
          //   localStorage.setItem(Config.ID_TOKEN, data.access_token);
          // }
          if (data.isLoginSuccessful) {
            localStorage.removeItem(Config.ID_TOKEN);
          //  localStorage.clear();
            localStorage.setItem(Config.ID_TOKEN, data.access_token);
            localStorage.setItem(Config.REFRESH_TOKEN, data.refresh_token);
             localStorage.setItem('secure', JSON.stringify(data));
        }
        })
        .catch(this.handleError)
    );
  }
  IsUserLoggedIn() {
    const secureToken = localStorage.getItem(Config.ID_TOKEN);
    return secureToken != null && secureToken !== undefined ? true : false;
  }
  /**
   *
   * @param userName to get login user details
   */
  public LoginDetails(userName: string) {
    const model = {
      Email: userName
    };
    const url = 'api/Account/GetDataByEmailId';
    return this.post(url, model);
  }
  /**
   * If user forgot password
   * @param userName
   * @param profileName
   */
  public ForgotPassword(userName: string) {
    const forgot = {
      Email: userName
    };
    const url = 'api/Account/ForgotPassword';
    return this.http.post(url, forgot).map((response: Response) => {
      return response;
    });
  }
  public OtpRequest(userName: string, otp: number) {
    const forgot = {
      Email: userName,
      VerificationCode: otp
    };
    const url = 'api/Account/OtpVerification';
    return this.http.post(url, forgot).map((response: Response) => {
      return response;
    });
  }

  /**
   * Change Password: by passing the oldPassword and newPassword
   * @param password
   * @param newpassword
   */
  public ChangePassword(email: string, password: string): Observable<any> {
    const changeMyPassword = {
      Email: email,
      Password: password
    };
    const postUrl = 'api/Account/ChangePassword';
    return this.http
      .post(postUrl, JSON.stringify(changeMyPassword))
      .map((response: Response) => {
        return <any>response.json();
      });
  }

  /**
   * Logout the user: clear the encrypted credentials
   */
  public Logout(): void {
    this.isLoggedin = false;
    // remove the local storage of the current user
    localStorage.clear();
  }

  // Handle the current errorResponse
  private handleError(error: Response) {
    const currentErrorResponse = new AuthRespose();
    currentErrorResponse.error = 'Incorrect username or password';
    currentErrorResponse.isLoginSuccessful = false;
    currentErrorResponse.access_token = undefined;
    return Observable.of(currentErrorResponse);
  }

  /**
   *
   *
   */
  public TenantDetails(): any {
    const url = 'api/Tenant/Details'; // ?domain=" + domainName;
    return this.get(url).map((response: Response) => {
        console.log(response);
        return response;
    });
  }
}

export class AuthRespose {
  isLoginSuccessful: boolean;
  access_token: string;
  error: string;
}

// export class TenantResponse {
//   OrganisationSettings: OrganisationModel;
//   SliderSettings: SliderModel;
// }
