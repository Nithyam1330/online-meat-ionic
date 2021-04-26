import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToasterService, TOAST_COLOR_ENUMS } from '../common/toaster/toaster.service';


export enum ConnectionStatus {
  Offline,
  Online
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Online);
  private isOnline: boolean = false;

  constructor(
      private network: Network,
      private toastService: ToasterService,
      public platform: Platform
  ) {
      this.platform.ready().then(() => {
          this.initializeNetworkEvents();
          if (this.platform.is('android') || this.platform.is('ios')) {
              let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
              this.status.next(status);
          }
      });
  }

  public initializeNetworkEvents() {
      this.network.onDisconnect().subscribe(() => {
          if (this.status.getValue() === ConnectionStatus.Online) {
              this.updateNetworkStatus(ConnectionStatus.Offline);
          }
      });
      this.network.onConnect().subscribe(() => {
          this.isOnline = true;
          if (this.status.getValue() === ConnectionStatus.Offline) {
              this.updateNetworkStatus(ConnectionStatus.Online);
          }
      });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
      this.status.next(status);
      let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
      await this.toastService.presentToast({
          message: `You are now ${connection}`,
          color: connection === 'Offline' ? TOAST_COLOR_ENUMS.DANGER : TOAST_COLOR_ENUMS.SUCCESS
      });
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
      return this.status.asObservable();
  }
  public getCurrentNetworkStatus(): ConnectionStatus {
      return this.status.getValue();
  }
}
