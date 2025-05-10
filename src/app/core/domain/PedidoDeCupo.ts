export class PedidoDeCupo {
  nombreEstudiante?: string;
  dniEstudiante?: string;
  nombreMateria?: string;
  codigoComision?: string;
  prioridad?: number;
  cupoAsignado?: boolean;
  motivo?: string;

  constructor(init?: Partial<PedidoDeCupo>) {
    this.nombreEstudiante = init?.nombreEstudiante;
    this.dniEstudiante = init?.dniEstudiante;
    this.nombreMateria = init?.nombreMateria;
    this.codigoComision = init?.codigoComision;
    this.prioridad = init?.prioridad;
    this.cupoAsignado = init?.cupoAsignado;
    this.motivo = init?.motivo;
  }
}

