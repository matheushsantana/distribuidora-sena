import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ReportBug } from '../report-bug/shared/report-bug';
import { ReportBugService } from '../report-bug/shared/report-bug.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})

export class BugsComponent implements OnInit {

  bugs: Observable<ReportBug[]>

  constructor(private reportBugService: ReportBugService, private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.bugs = this.reportBugService.getAllBug();
    setTimeout(() => {
      this.appComponent.ativaNav = false;
      this.appComponent.menuPerfil = false;
    }, 1000)
  }

  delete(key: any){
    this.reportBugService.deleteBug(key)
  }

}
