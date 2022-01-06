import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnnouncementService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getAnnouncements() {
        return this.http.get('http://localhost:8000/announcements');
    }


    //Uses http.get() to request data based on student id 
    getAnnouncement(announcementId: string) {
        return this.http.get('http://localhost:8000/announcements/'+ announcementId);
    }

    //Uses http.post() to post data
    addAnnouncement(title: string, author: string, body: string){
        this.http.post('http://localhost:8000/announcements',{title, author, body})
        .subscribe((responseData) => {
            console.log(responseData);
        });
    }

    deleteAnnouncement(announcementId: string) {
        this.http.delete("http://localhost:8000/announcements/" + announcementId)
        .subscribe(() => {
            console.log('Deleted: ' + announcementId);
            window.location.reload();
        });
    }
     
    updateAnnouncement(announcementId: string,title: string, author: string, body: string) {
        //request path http://localhost:8000/announcements/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/announcements/" + 
        announcementId,{ title, author, body })
        .subscribe(() => {
            console.log('Updated: ' + announcementId);
            //location.reload();
        });
    }

}