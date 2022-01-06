import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { StudentService } from './student.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ContentComponent } from './content/content.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListContentComponent } from './list-content/list-content.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentService } from './content.service';
import { AnnouncementService } from './announcements.service';
import { CapstoneService } from './capstone.service';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ListAnnouncementsComponent } from './list-announcements/list-announcements.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ListViewComponent } from './list-view/list-view.component';
import { VideoSearchComponent } from './video-search/video-search.component';



const appRoutes: Routes = [{
  path: '', //default component to display
  component: ListContentComponent
}, {
  path: 'addContent', //when students added 
  component: ContentComponent
}, {
  path: 'editContent/:_id', //when students edited 
  component: ContentComponent
}, {
  path: 'listContents', //when students listed
  component: ListContentComponent
}, 

{
  path: 'addAnnouncement',  //when students added 
  component: AnnouncementsComponent
}, 

{
  path: 'editAnnouncement/:_id', //when students edited
  component: AnnouncementsComponent
},

{
  path: 'listAnnouncements',  //when students listed
  component: ListAnnouncementsComponent
}, 
{
  path: 'addAssignments', 
  component: AssignmentsComponent
},
{
  path: 'editAssignments/:_id', 
  component: AssignmentsComponent 
}, 
{
  path: 'editProject/:_id', 
  component: AssignmentsComponent 
},
{
  path: 'listAssignments', 
  component: ListViewComponent
}, 
{
  path: 'list-view', 
  component: ListViewComponent
},

{
  path: '**', //when path cannot be found
  component: NotFoundComponent
}
];




@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    ListContentComponent,
    NavigationMenuComponent,
    NotFoundComponent,
    AnnouncementsComponent,
    ListAnnouncementsComponent,
    AssignmentsComponent,
    ListViewComponent,
    VideoSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ContentService, AnnouncementService, CapstoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
