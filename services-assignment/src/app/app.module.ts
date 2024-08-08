import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ActiveUsersComponent } from './active-users/active-users.component';
import { AppComponent } from './app.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { FormsModule } from '@angular/forms';
import { CounterService } from './counter.service';

@NgModule({
  declarations: [
    AppComponent,
    ActiveUsersComponent,
    InactiveUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
