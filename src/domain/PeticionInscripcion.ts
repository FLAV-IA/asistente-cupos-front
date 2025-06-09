import { HistoriaAcademica } from './HistoriaAcademica';

export interface PeticionPorMateria {
  nombreMateria: string;
  codigoMateria: string;
  codigosComisionesSolicitadas: string[];
  cumpleCorrelativa: boolean;
}

export interface PeticionInscripcion {
  nombre: string;
  dni: string;
  historiaAcademica: HistoriaAcademica;
  materias: PeticionPorMateria[];
}
