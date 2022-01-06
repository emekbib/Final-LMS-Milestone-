import { Component, Input, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcements.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component ({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit{

  @Input() title: string = "";
  @Input() author: string = "";
  @Input() body: string = "";
  
  
  public mode = 'Add'; //default mode
  private id: any; //project ID
  private announcement: any;

  constructor (private _myService: AnnouncementService, private router:Router, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id')){
            this.mode = 'Edit'; /*request had a parameter _id */ 
            this.id = paramMap.get('_id');

             //request student info based on the id
            this._myService.getAnnouncement(this.id).subscribe(
                data => { 
                    //read data and assign to private variable announcement
                    this.announcement = data;
                    //populate the data on the page
                    //notice that this is done through the two-way bindings
                    this.title = this.announcement.title;
                    this.author = this.announcement.author;
                    this.body = this.announcement.body;
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
    console.log("You submitted: " + this.title + " " + this.author + " " + this.body);
    if (this.mode == 'Add')
    this._myService.addAnnouncement(this.title, this.author, this.body);
    if (this.mode == 'Edit')
    this._myService.updateAnnouncement(this.id, this.title, this.author, this.body);
    this.router.navigate(['listAnnouncements']);
  }

}