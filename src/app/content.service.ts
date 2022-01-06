
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContentService {

    constructor(private http: HttpClient) { }

    // Uses http.get() to load data 
    getContents() {
        return this.http.get('http://localhost:8000/contents');
    }

     //Uses http.get() to request data based on Content id 
     getContent(contentId: string) {
        return this.http.get('http://localhost:8000/contents/' + contentId);
    }

    //Uses http.post() to post data 
    addContents(Title: string, Content: string, Description: string, Attachment: string) {
        this.http.post('http://localhost:8000/contents', { Title, Content, Description, Attachment })
            .subscribe((responseData) => {
                console.log(responseData);
            });
        // location.reload();
    }


    updateContent(contentId: string, Title: string, Content: string, Description: string, Attachment: string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/contents/" +
            contentId, { Title, Content, Description, Attachment })
            .subscribe(() => {
                console.log('Updated: ' + contentId);
            });
            // location.reload();
    }

   

    deleteContent(contentId: string) {
        this.http.delete("http://localhost:8000/contents/" + contentId)
            .subscribe(() => {
                console.log('Deleted: ' + contentId);
                location.reload();
            });
        
    }




}

