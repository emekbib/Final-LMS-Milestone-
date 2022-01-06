import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../content.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public mode = 'Add'; //default mode
  private id: any; //student ID
  private content: any;

  formProfileForm = 'LMS Content Form';

  Title = '';
  Content = '';
  Description = '';
  Attachment = '';  


  constructor(private _myService: ContentService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        //request student info based on the id
        this._myService.getContent(this.id).subscribe(
          data => {
            //read data and assign to private variable student
            this.content = data;
            //populate the firstName and lastName on the page
            //notice that this is done through the two-way bindings
            this.Title = this.content.Title;
            this.Content = this.content.Content;
            this.Description = this.content.Description;
            this.Attachment = this.content.Attachment;
          },
          err => console.error(err),
          () => console.log('finished loading')
        );

      }
      else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }


  onSubmit() {
    // console.log("You submitted: " + this.firstName + " " + this.lastName);
    console.log("This is what You submitted: " + this.profileForm.get('Title').value + " " + this.profileForm.get('Content').value
      + " " + this.profileForm.get('Description').value + " " + this.profileForm.get('Attachment').value);
    // check the value of mode to either add or update the document.
    if (this.mode == 'Add')
      this._myService.addContents(this.Title, this.Content, this.Description, this.Attachment);
    if (this.mode == 'Edit')
      this._myService.updateContent(this.id, this.Title, this.Content, this.Description, this.Attachment);
    this.router.navigate(['/listContents']);
  }

 
  profileForm = new FormGroup({
    Title: new FormControl('', Validators.required),
    Content: new FormControl('', Validators.required),
    Description: new FormControl(''),
    Attachment: new FormControl(''),
  });






}

