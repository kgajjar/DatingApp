import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';



@NgModule({
  declarations: [TestErrorsComponent, NotFoundComponent, ServerErrorComponent, MemberCardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
