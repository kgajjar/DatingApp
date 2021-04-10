import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  //The root will load home component
  { path: '', component: HomeComponent },

  //Apply route guards to multiple routes
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      //We added our authgaurd below. Add it per link you want to protect.
      { path: 'members', component: MemberListComponent },
      //We have a placeholder here
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  },

  //Register the error route outside routegaurd so we dont need to login
  { path: 'errors', component: TestErrorsComponent },

  //Register the not-found component route outside routegaurd so we dont need to login
  { path: 'not-found', component: NotFoundComponent },

  //Register the server-error component route outside routegaurd so we dont need to login
  { path: 'server-error', component: ServerErrorComponent },

  //Wilcard route: User hs typed in a URL that doesn't match anything.
  //Direct them to homecomponent for now.
  //pathMatch full: If user doesn't match any of above then we will redirect them to HomeComponent as it has to match full route.
  { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
