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
import { startWith, tap } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { AlertService } from "src/app/services/alert.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-report-emailscreen",
  templateUrl: "./report-emailscreen.component.html",
  styleUrls: ["./report-emailscreen.component.scss"],
})
export class ReportEmailscreenComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "emails", "action"];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  reportEmails: any = [];
  isLoading = true;
  reportData;
  postData: any;
  reportId: any;
  selectedReportId:any;
  emails: string;
  isEdit: boolean = true;
  editBtn: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr:ToastrService
  ) {}

  ngOnInit() {
    this.getReportListData();
  }
  // Get Report List
  getReportListData() {
    this.apiService.getReportList().subscribe(
      (data) => {
        this.reportData = data;
        this.isLoading = true;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
        this.isLoading = false;
        console.log("errr", err);
        this.toastr.error(err);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reportData.filter = filterValue.trim().toLowerCase();
  }
  
  onEditEmail(emails,id) {
    event.preventDefault();
    this.selectedReportId = id
    this.isEdit = false;
    this.editBtn = false;
    this.reportEmails = [...emails];
    console.log("this.reportEmails",this.reportEmails);
  }
  
  cancelEdit(id){
   this.isEdit = true;
   this.selectedReportId = !id
  }

  addNewEmail(event: MatChipInputEvent, reportID) {
    this.reportId = reportID;
    const newEmail = (event.value || "").trim();
    if (newEmail) {
      this.reportEmails.push(newEmail);
      this.reportData[this.reportId-1].emails = [];
      this.reportData[this.reportId-1].emails = this.reportEmails;
    }
    // Clear the input value
    event.input.value = "";
  }

  removeEmail(emailIndex,reportIndex): void {
    this.reportEmails.splice(emailIndex,1)
     this.reportData[reportIndex].emails = this.reportEmails;
  
  }
  postReportData(reportId) {
    let payload = {
      emails: this.reportEmails,
    };
    console.log("payload", payload,reportId);
     this.apiService.postReportListData(reportId,payload).subscribe((data) => {
      this.getReportListData();
      this.isLoading = true;
      this.isLoading = false;
    });
    
  }
}
