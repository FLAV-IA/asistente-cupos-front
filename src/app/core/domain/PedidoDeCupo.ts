export class PedidoDeCupo {
  alumno?: string;
  materia?: string;
  comision?: string;
  prioridad?: number;
  cupoAsignado?: boolean;
  explicacion?: string;
  cumpleCorrelativas?: boolean;

  constructor(init?: Partial<PedidoDeCupo>) {
    Object.assign(this, init);
  }
}
