export class HistoriaAcademica {
  constructor(
    public dni: string,
    public totalInscripcionesHistoricas: number,
    public totalHistoricasAprobadas: number,
    public coeficiente: number,
    public cumpleCorrelativas: boolean,
    public codigosCursadasAnteriores: string[],
    public codigosInscripcionesActuales: string[]
  ) {}

  tieneCoeficienteAlto(): boolean {
    return this.coeficiente > 7.0;
  }

  estaLibre(): boolean {
    return this.codigosInscripcionesActuales.length === 0;
  }
}
