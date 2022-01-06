import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {

  //declare variable to hold response and make it public to be accessible from components.html
  public contents: any;

  //initialize the call using StudentService 
  constructor(private _myService: ContentService) { }
  
  ngOnInit() {
      this.getContents();
  }
  
   //method called OnInit
   getContents() {
    this._myService.getContents().subscribe(
      //read data and assign to public variable students
      data => { this.contents = data },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  
  onDelete(contentId: string) {
    this._myService.deleteContent(contentId);
   }

   

}
