import { Component, OnInit } from '@angular/core';
import { ReportBug } from './shared/report-bug';
import { ReportBugService } from './shared/report-bug.service';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {

  bug: ReportBug

  constructor(private reportBugService: ReportBugService) { }

  ngOnInit() {
    this.bug = new ReportBug();
  }

  onSubmit() {
    this.reportBugService.insertBug(this.bug);
    this.bug = new ReportBug();
  }

}
