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
}
