import { Component, OnInit, Input } from '@angular/core';
//import { FormControl } from '@angular/forms';
//import { Validators } from '@angular/forms';
// import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CapstoneService } from '../capstone.service';
import { Router} from '@angular/router';
import { EMPTY, empty } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html', 
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  @Input() Lab1: File | null = null;
  @Input() Lab2: File | null = null;
  @Input() Comments1: Text | null = null;
  @Input() Comments2: Text | null = null;

    public mode = 'Add'; 
    private id: any;
    private LMSproject: any;

 
 constructor(private _myService: CapstoneService, private router:Router, public route: ActivatedRoute) { }
    
ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id')){
          this.mode = 'Edit'; 
          this.id = paramMap.get('_id');

          
          this._myService.getProject(this.id).subscribe(
              data => { 
                  this.LMSproject = data;
                  this.Lab1 = this.LMSproject.Lab1;
                  this.Lab2 = this.LMSproject.Lab2;
                  this.Comments1 = this.LMSproject.Comments1;
                  this.Comments2 = this.LMSproject.Comments2;
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
  onSubmit(){
    console.log("You submitted: " + this.Lab1 + " " + this.Lab2 + " " + this.Comments1 + this.Comments2 );
    if ((this.mode == 'Add') && (this.Lab1 != null) && (this.Lab2 != null) && (this.Comments1 != null) && (this.Comments2 != null)) 
    this._myService.addProjects(this.Lab1, this.Lab2, this.Comments1, this.Comments2);
    if ((this.mode == 'Edit') && (this.Lab1 != null) && (this.Lab2 != null) && (this.Comments1 != null) && (this.Comments2 != null)) 
    this._myService.addProjects(this.Lab1, this.Lab2, this.Comments1, this.Comments2);
    this.router.navigate(['/list-view']);
}

}


 

