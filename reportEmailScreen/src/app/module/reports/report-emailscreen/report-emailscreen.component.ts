import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { startWith, tap, delay } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { AlertService } from "src/app/services/alert.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { ToastrService } from "ngx-toastr";
import { of } from 'rxjs';

@Component({
  selector: "app-report-emailscreen",
  templateUrl: "./report-emailscreen.component.html",
  styleUrls: ["./report-emailscreen.component.scss"],
})
export class ReportEmailscreenComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "emails","frequency" ,"action"];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  reportEmails: any = [];
  isLoading = true;
  reportData;
  postData: any;
  reportId: any;
  selectedReportId: any;
  emails: string;
  isEdit: boolean = true;
  btnVisible:boolean = false;
  _reportsData: any= [];
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getReportListData();
    
  }
  // Get Report List
  getReportListData() {
    this.apiService.getReportList().subscribe(
      (data) => {
        this.reportData = data;
        this._reportsData = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reportData.filter = filterValue.trim().toLowerCase();
  }

  onEditEmail(emails, id) {
    event.preventDefault();
    this.selectedReportId = id;
    this.isEdit = false;
    this.reportEmails = [...emails];
  }

  cancelEdit(id) {
    this.isEdit = true;
    this.selectedReportId = !id;
  }

  addNewEmail(event: MatChipInputEvent, reportID) {
    if(event){
      this.btnVisible = true;
    }
    this.reportId = reportID;
    const newEmail = (event.value || "").trim();
    if (newEmail) {
      this.reportEmails.push(newEmail);
      this.reportData[this.reportId - 1].emails = [];
      this.reportData[this.reportId - 1].emails = this.reportEmails;
    }
    // Clear the input value
    event.input.value = "";
  }

  removeEmail(emailIndex, reportIndex,$event): void {
    if($event){
      this.btnVisible = true;
    }
    this.reportEmails.splice(emailIndex, 1);
    this.reportData[reportIndex].emails = this.reportEmails;
  }
  postReportData(reportId) {
    let _params ={
      recipientsEmails:{
        existing:[],
        deleted:[],
        created:[]
      }
    }
    let payload = {
      emails: this.reportEmails,
    };
    if(reportId){
      this.btnVisible = true;
    }
    this.apiService.postReportListData(reportId, payload).subscribe((res) => {
    this.isLoading = true;
    // this.getReportListData();
      
     
    });
   
  }
}
