import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Vacaciones,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVacacionesController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/vacaciones', {
    responses: {
      '200': {
        description: 'Vacaciones belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacaciones)},
          },
        },
      },
    },
  })
  async getVacaciones(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
  ): Promise<Vacaciones> {
    return this.empleadoRepository.vacaciones(id);
  }
}
