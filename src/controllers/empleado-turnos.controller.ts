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
  Turnos,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoTurnosController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/turnos', {
    responses: {
      '200': {
        description: 'Turnos belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Turnos)},
          },
        },
      },
    },
  })
  async getTurnos(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
  ): Promise<Turnos> {
    return this.empleadoRepository.turnos(id);
  }
}
