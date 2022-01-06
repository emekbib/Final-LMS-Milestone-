import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {


  videos: any;
  selectedVideo: any;
  servicePoint = "https://www.googleapis.com/youtube/v3/search";
  condition = false;
  APIKey = "&key=AIzaSyA7cQT2RLNqI__IHov7PAqGz-3UOqyKBS0"

// https://developers.google.com/youtube/v3/sample_requests#searching-for-playlists-or-channels
// https://www.googleapis.com/youtube/v3/search?q=web+development&type=video&key=AIzaSyA7cQT2RLNqI__IHov7PAqGz-3UOqyKBS0&maxResults=10
// https://www.googleapis.com/youtube/v3/search?part=snippet&q=web+development&type=video&key=AIzaSyA7cQT2RLNqI__IHov7PAqGz-3UOqyKBS0&maxResults=10
// https://www.youtube.com/watch?v=iWK1bpbvryg  -- stick the videoId from the JSON snippet at the end of this url to go to the video.


  constructor(private fb: FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
  }

  searchForm = this.fb.group({
    keyword: [''],
  })

  onSubmit(){
    let keyword = this.searchForm.get('keyword').value;
    this.getVideos(keyword, 0);
  }

  getVideos(keyword, startIndex) {
    let parameter = "?part=snippet" + "&q=" + keyword + "&type=video" + this.APIKey + "&maxResults=10";

    this.http.get(this.servicePoint + parameter)
    .subscribe((data) => {
        console.log(data);
        this.videos = data;
        this.condition = true;
    }); 
  }

  selectVideo(id){
    this.http.get(this.servicePoint + id)
    .subscribe((data) => {
      this.selectedVideo = data;
      console.log(data);
    })
  }



}
