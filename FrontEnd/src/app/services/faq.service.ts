import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao } from '../models/Filtros/FiltroPadrao';




import { AuthService } from './auth.service';
import { ParamGeralFiltro } from './param-filtro';
import { FaqPortal } from '../models/FaqPortalModel/FaqPortal';

@Injectable({
  providedIn: 'root'
})

export class FaqService {


  constructor(public httpClient: HttpClient, public httpClient2: HttpClient, handler: HttpBackend) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];

  

  ListFaqPortal() {
    return this.httpClient.post<Array<FaqPortal>>(
      `${this.baseUrl}/Faq/ListFaqPortal/`,
      null
    );
  }


}