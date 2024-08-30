import { EmpresaModel } from "../EmpresaModel/EmpresaModel";
import { PesquisaResult } from "../PesquisaResultModel/PesquisaResult";

export class TableDataInfo
{
    RazonSocial:string;
    NombreComercial:string;
    RUC:string;
    Contacto:string;
    Cargo:string;
    Direccion:string;
    Distrito:string;
    Departamento:string;
    Telefono:string;
    ActividadEconomica:string;
    Site:string;
    Fundacion:string;
    GerenteGeneral:string;
}


export class RowTable
{
    // tableData: Array<TableDataInfo>
    // tableData: Array<PesquisaResult>

    tableData: Array<EmpresaModel>
}