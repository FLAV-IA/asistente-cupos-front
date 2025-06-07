import { HistoriaAcademica } from './HistoriaAcademica';

export class SugerenciaDeInscripcion {
  constructor(
    public nombreEstudiante?: string,
    public dniEstudiante?: string,
    public nombreMateria?: string,
    public codigoComision?: string,
    public prioridad?: number,
    public cupoAsignado?: boolean,
    public motivo?: string,
    public historiaAcademica?: HistoriaAcademica
  ) {}
}
