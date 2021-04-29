import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqlService } from './shared/services/database/sql.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private sqlService: SqlService, private plt: Platform) {}

   ngOnInit() {
    this.plt.ready().then(() => {
        this.sqlService.createDB();
    });
    }
}
