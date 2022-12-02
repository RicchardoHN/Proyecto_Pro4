import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Turnos,
  Empleado,
} from '../models';
import {TurnosRepository} from '../repositories';

export class TurnosEmpleadoController {
  constructor(
    @repository(TurnosRepository) protected turnosRepository: TurnosRepository,
  ) { }

  @get('/turnos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Turnos has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.turnosRepository.empleados(id).find(filter);
  }

  @post('/turnos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Turnos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Turnos.prototype.idTurno,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInTurnos',
            exclude: ['idEmpleado'],
            optional: ['turnosId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'idEmpleado'>,
  ): Promise<Empleado> {
    return this.turnosRepository.empleados(id).create(empleado);
  }

  @patch('/turnos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Turnos.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.turnosRepository.empleados(id).patch(empleado, where);
  }

  @del('/turnos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Turnos.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.turnosRepository.empleados(id).delete(where);
  }
}
