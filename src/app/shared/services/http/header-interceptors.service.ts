import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { LOCAL_STORAGE_ENUMS } from '../../constants/local-storage.enums';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../common/loader/loader.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Injectable()
export class HeaderInterceptorsService {

  constructor(
    private StorageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService) { }

  handleAuthError= async (err: HttpErrorResponse): Promise<any> => {
    console.log('sample');
    await this.loaderService.dissmissLoading();
    if (err.status === 401) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Session Expired. Please Login again',
        buttons: [
          {
            text: 'Ok',
            cssClass: 'secondary'
          }
        ],
        backdropDismiss: false
      });
      alert.onDidDismiss().then(res => {
        this.storageService.clearLocalStorage();
        this.router.navigate(['/login'], { replaceUrl: true });
      });
      return await alert.present();
    }
    else if (err.status === 400) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Bad Request',
        buttons: [
          {
            text: 'Ok',
            cssClass: 'secondary'
          }
        ],
        backdropDismiss: false
      });
      alert.onDidDismiss().then(res => {
        this.storageService.clearLocalStorage();
        this.router.navigate(['/login'], { replaceUrl: true });
      });
      return await alert.present();
    }
    return of(err.message);

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const defaultHeaders = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
    const authToken = this.StorageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ACCESS_TOKEN);
    if (authToken) {
      defaultHeaders['Authorization'] = 'Bearer ' + authToken;
    }
    if (req.headers.keys().length > 0) {   // This replaces default headers if any headers passed at the request time
      req.headers.keys().forEach((headerKey) => {
        if (headerKey === 'Content-Type' && req.headers.get(headerKey) === 'multipart/form-data') {
          delete defaultHeaders['Content-Type'];
        } else {
          defaultHeaders[headerKey] = req.headers.get(headerKey);
        }
      });
    }

    const modifiedReq = req.clone({
      headers: new HttpHeaders(defaultHeaders),
    });
    return next.handle(modifiedReq).pipe(catchError(this.handleAuthError));
  }
}
