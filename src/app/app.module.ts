import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminCreateuserComponent } from './components/admin-createuser/admin-createuser.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminUsereditComponent } from './components/admin-useredit/admin-useredit.component';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppService } from './components/state/app.service'
import { postReducer,profileReducer } from './components/state/app.reducer'
import { appEffects } from './components/state/app.effects'
import { AdminRoutingModule } from './components/admin-login/admin.routing'





@NgModule({
  declarations: [
    AppComponent,
    AdminCreateuserComponent,
    AdminLoginComponent,
    AdminNavComponent,
    AdminUsereditComponent,
    AdminUserlistComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({userdetails:profileReducer,allusers:postReducer},{}),
    EffectsModule.forRoot([appEffects])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
