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
import { startWith, tap, delay, filter } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { ToastrService } from "ngx-toastr";
interface ReportData{
  id:number,
  name:string,
  frequency:string,
  recipientsEmail:{
    existing:string[],
    inserted:string[],
    deleted:string[]
  }
}

@Component({
  selector: "app-report-emailscreen",
  templateUrl: "./report-emailscreen.component.html",
  styleUrls: ["./report-emailscreen.component.scss"],
})
export class ReportEmailscreenComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "emails", "frequency", "action"];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isLoading = true;
  reportData:ReportData[];
  dataSource: MatTableDataSource<any>;
  isVisible: boolean = false;
  search:string
  editableRow = {
    id: null,
    isEditable: false,
  };
  index
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit() {
    this.getReportListData();
    this.dataSource = new MatTableDataSource(this.reportData);
    this.dataSource.filterPredicate = (data,filter) =>  {
      true
      return data.recipientsEmail.existing.filter((res:any) =>{
        res.indexOf(filter) != -1 
        
       }
      )
    }
    this.dataSource = new MatTableDataSource(this.reportData);
    
   
}
  // Get Report List
  getReportListData() {
    this.apiService.getReportList().subscribe(
      (data: any) => {
        this.reportData =  data.map((item) => {
          return {
            ...item,
            recipientsEmail: {
              existing: [...item.recipientsEmail.existing],
              deleted: [],
              inserted: [],
            },
          };
        });
      
        this.dataSource = new MatTableDataSource(this.reportData);
        
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    console.log(this.dataSource.filteredData);
    
  }

  onEditEmail(reportId, isEditable) {
    this.editableRow = {
      id: reportId,
      isEditable,
    };
  }

  cancelEdit(reportId) {
    this.editableRow.id = !reportId;
  }

  addNewEmail(event: MatChipInputEvent, reportId, emailIndex: number) {
    // debugger
    const value = (event.value || "").trim();
    const validRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const indx = this.reportData.findIndex((report) => report.id === reportId);
      //  this.index =indx
    // checking that email is valid or not
    if (validRegex.test(value)) {
      // for duplicate entery not allowed
      if (
        value &&
        indx >= 0 &&
        this.reportData[indx].recipientsEmail.existing.indexOf(value) === -1 &&
        this.reportData[indx].recipientsEmail.inserted.indexOf(value) === -1
      ) {
        // comparing two array while insert will not presnt in deleted emails array
        if (
          this.reportData[indx].recipientsEmail.deleted.filter(
            (email) =>
              !this.reportData[indx].recipientsEmail.inserted.includes(email)
          )
        ) {
          const index = this.reportData[indx].recipientsEmail.deleted.indexOf(
            value
          );
          if (index !== -1) {
            this.reportData[indx].recipientsEmail.deleted.splice(index, 1);
            this.reportData[indx].recipientsEmail.existing.push(value);
          } else {
            this.reportData[indx].recipientsEmail.inserted.push(value);
          }
        }
      }
      event.input.value = "";
    } else {
      event.input.value = "";
      console.log("Invalid email");
    }
    if (reportId) {
      this.isVisible = true;
    }
  }
  removeEmail(emailIndex: number, email: string, report: any): void {
    const indx = this.reportData.findIndex(
      (reportObj) => reportObj.id === report.id
    );
    const insertedEmailIndex = this.reportData[
      indx
    ].recipientsEmail.inserted.indexOf(email);
    if (insertedEmailIndex !== -1) {
      this.reportData[indx].recipientsEmail.inserted.splice(
        insertedEmailIndex,
        1
      );
      return;
    }
    if (indx >= 0) {
      this.reportData[indx].recipientsEmail.existing.splice(emailIndex, 1);
      this.reportData[indx].recipientsEmail.deleted.push(email);
    }
    if (report.id) {
      this.isVisible = true;
    }
  }
  postReportData(reportId) {
    const indx = this.reportData.findIndex((report) => report.id === reportId);
    if (reportId) {
      this.isVisible = true;
    }
    let requestParams = {
      recipientsEmail: this.reportData[indx].recipientsEmail,
    };
    this.apiService.postReportListData(reportId, requestParams).subscribe(
      (res) => {
        this.isLoading = true;
        // this.getReportListData();
      },
      (err) => console.error(err),
      () => console.log("Error")
    );
  }
}
