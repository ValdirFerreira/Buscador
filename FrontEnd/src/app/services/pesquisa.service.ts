import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PesquisaRequest, PesquisaResult } from '../models/PesquisaResultModel/PesquisaResult';
import { SolicitudCotizacion, SolicitudCotizacionPlano } from '../models/SolicitudCotizacionModel/SolicitudCotizacion';
import { EmpresaModel } from '../models/EmpresaModel/EmpresaModel';

@Injectable({
  providedIn: 'root'
})

export class PesquisaService {

  cadastroEmpresa:boolean= false;
  constructor(public httpClient: HttpClient, public httpClient2: HttpClient, handler: HttpBackend) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];

  

  ListPesquisa(model:PesquisaRequest) {
    return this.httpClient.post<Array<EmpresaModel>>(
      `${this.baseUrl}/Pesquisa/ListPesquisa/`,
      model
    );
  }

  addEmpresa(empresa: EmpresaModel) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Empresas/Add/`,
      empresa
    );
  }


  insertSolicitudCotizacion(solicitud: SolicitudCotizacion) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Pesquisa/InsertSolicitudCotizacion/`,
      solicitud
    );
  }

  insertSolicitudCotizacionPlano(solicitud: SolicitudCotizacionPlano) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Pesquisa/InsertSolicitudCotizacionPlano/`,
      solicitud
    );
  }




}