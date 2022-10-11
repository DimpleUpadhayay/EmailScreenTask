import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReport'
})
export class SearchReportPipe implements PipeTransform {
  dataSource: any;

  // transform(dataSource:any, value: string): any {
  //   return this.dataSource = dataSource.filter(report => {
  //      value ? report.recipientsEmail.existing.includes(value) :dataSource
  //   });
  // }
   transform(value: Array<any>, searchString?: string, key1?: string, key2?: string ): Array<any> {
    if (!searchString) return value;
    return value.filter(
      (res: any) =>
        //******** Using Startswith()  *************
        res.indexOf(searchString) !== -1 
       
      
    );
  }

}
