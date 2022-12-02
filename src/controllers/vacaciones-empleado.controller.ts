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
  Vacaciones,
  Empleado,
} from '../models';
import {VacacionesRepository} from '../repositories';

export class VacacionesEmpleadoController {
  constructor(
    @repository(VacacionesRepository) protected vacacionesRepository: VacacionesRepository,
  ) { }

  @get('/vacaciones/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Vacaciones has many Empleado',
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
    return this.vacacionesRepository.empleados(id).find(filter);
  }

  @post('/vacaciones/{id}/empleados', {
    responses: {
      '200': {
        description: 'Vacaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vacaciones.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInVacaciones',
            exclude: ['idEmpleado'],
            optional: ['vacacionesId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'idEmpleado'>,
  ): Promise<Empleado> {
    return this.vacacionesRepository.empleados(id).create(empleado);
  }

  @patch('/vacaciones/{id}/empleados', {
    responses: {
      '200': {
        description: 'Vacaciones.Empleado PATCH success count',
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
    return this.vacacionesRepository.empleados(id).patch(empleado, where);
  }

  @del('/vacaciones/{id}/empleados', {
    responses: {
      '200': {
        description: 'Vacaciones.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.vacacionesRepository.empleados(id).delete(where);
  }
}
