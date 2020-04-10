import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EntitiesComponent } from './entities/entities.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    EntityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
