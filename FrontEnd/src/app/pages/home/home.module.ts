import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TraducaoService } from 'src/app/services/traducao-service';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterBottomModule } from 'src/app/components/footer-bottom/footer-bottom.module';
import { DialogContentModule } from 'src/app/components/dialog-content/dialog-content.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RecuperarSenhaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NavbarModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    FooterBottomModule,
    MatInputModule,

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })

  ],
  exports: [
    CommonModule,
    // TranslateModule
  ],

})
export class HomeModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TraducaoService(http);
}