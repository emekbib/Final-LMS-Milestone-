import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CapstoneService {

    constructor(private http:HttpClient) {}


    getProjects() {
        return this.http.get('http://localhost:8000/projects');
    }
    
    getProject(projectId: string) {
    return this.http.get('http://localhost:8000/projects/'+ projectId);
}
   
    addProjects(Lab1:File,Lab2:File,Comments1:Text,Comments2:Text) {
        this.http.post('http://localhost:8000/projects', { Lab1, Lab2, Comments1,Comments2})
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
        
    }
    deleteProject(projectId: string) {
        this.http.delete("http://localhost:8000/projects/" + projectId)
            .subscribe(() => {
                console.log('Deleted: ' + projectId);
            });
            location.reload();
    }
    updateProject(projectId: string, Lab1: File, Lab2: File, Comments1:Text, Comments2:Text) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/projects/" + 
        projectId,{ })
        .subscribe(() => {
            console.log('Updated: ' + projectId);
        });
    }
}
