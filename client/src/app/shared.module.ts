import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';



@NgModule({
  declarations: [TestErrorsComponent, NotFoundComponent, ServerErrorComponent, MemberCardComponent, MemberEditComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
