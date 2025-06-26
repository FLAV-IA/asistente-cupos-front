export class StepState {
  static readonly INICIAL = 0;
  static readonly PREVISUALIZACION = 1;
  static readonly ASIGNACION = 2;
}

export type Estado = 'inicial' | 'previsualizando' | 'cargando'

export const estadoAStep: Record<Estado, StepState> = {
  inicial: StepState.INICIAL,
  previsualizando: StepState.PREVISUALIZACION,
  cargando: StepState.ASIGNACION
};
