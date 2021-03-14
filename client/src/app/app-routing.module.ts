import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';

const routes: Routes = [
  //The root will load home component
  { path: '', component: HomeComponent },

  //Apply route guards to multiple routes
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      //We added out authgaurd below. Add it per link you want to protect.
      { path: 'members', component: MemberListComponent },
      //We have a placeholder here
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  },

  //Wilcard route: User hs typed in something that doesn't match anything.
  //Direct them to homecomponent for now.
  //pathMatch full: If user doesn't match any of above then we will redirect them to HomeComponent as it has to match full route.
  { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
