export class SolicitudCotizacion {
    Id: number;
    Empresa: string;
    ActividadEconomica: string;
    Nombres: string;
    CorreoElectronico: string;
    Comentario: string;
    DataCadastro: Date; // Utilize Date em vez de DateTime
}


export class SolicitudCotizacionPlano {
    Id: number;
    TipoPlano: string;
    ValorPlano: string;
    Nombres: string;
    Telefono: string;
    CorreoElectronico: string;
    Comentario: string;
    DataCadastro: Date;
}

