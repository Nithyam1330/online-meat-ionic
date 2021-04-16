import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../../shared/constants/request-enums';
import Utils from '../../../../shared/services/common/utils';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.scss'],
})
export class AddressManagementComponent implements OnInit {
  addressList = [];
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.getAllAddress();
  }

  ionViewDidLoad() {
    // this.getAllAddress();
  }

  /** Add||Modify Address */
  public addAddress() {
    this.router.navigate(['profile', 'address', 'add-address']);
  }

  async openAddressOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        icon: 'Pencil',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  /**Fetch User Addresses from DB */
  private async getAllAddress() {
    await this.loaderService.showLoader();
    this.commonRequestService
      .request(RequestEnums.GET_ALL_ADDRESS)
      .subscribe(async (Response) => {
        await this.loaderService.dissmissLoading();

        if (Utils.isValidInput(Response.data)) {
          this.addressList = Response.data;
          console.log(this.addressList);
        }
      });
  }
}
