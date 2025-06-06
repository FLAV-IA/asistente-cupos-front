import {HistoriaAcademica} from "./HistoriaAcademica";

export class SugerenciaDeInscripcion {
  nombreEstudiante?: string;
  dniEstudiante?: string;
  nombreMateria?: string;
  codigoComision?: string;
  prioridad?: number;
  cupoAsignado?: boolean;
  motivo?: string;
  historiaAcademica?: HistoriaAcademica;

  constructor(init?: Partial<SugerenciaDeInscripcion>) {
    this.nombreEstudiante = init?.nombreEstudiante;
    this.dniEstudiante = init?.dniEstudiante;
    this.nombreMateria = init?.nombreMateria;
    this.codigoComision = init?.codigoComision;
    this.prioridad = init?.prioridad;
    this.cupoAsignado = init?.cupoAsignado;
    this.motivo = init?.motivo;
    this.historiaAcademica = init?.historiaAcademica;
  }
}
