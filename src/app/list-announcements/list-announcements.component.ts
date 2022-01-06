import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcements.service';

@Component({
  selector: 'app-list-announcements',
  templateUrl: './list-announcements.component.html',
  styleUrls: ['./list-announcements.component.css']
})
export class ListAnnouncementsComponent {

  public announcements: any;
  constructor(private _myService: AnnouncementService) { }

  ngOnInit() {
    this.getAnnouncements();
  }

  getAnnouncements() {
    this._myService.getAnnouncements().subscribe(
        //read data and assign to public variable students
        data => { this.announcements = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
}

  onDelete(annoucementsId: string) {
    this._myService.deleteAnnouncement(annoucementsId);
}

}
