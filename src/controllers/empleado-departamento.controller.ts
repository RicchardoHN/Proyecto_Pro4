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
  Empleado,
  Departamento,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoDepartamentoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento[]> {
    return this.empleadoRepository.departamentos(id).find(filter);
  }

  @post('/empleados/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInEmpleado',
            exclude: ['idJefe'],
            optional: ['empleadoId']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'idJefe'>,
  ): Promise<Departamento> {
    return this.empleadoRepository.departamentos(id).create(departamento);
  }

  @patch('/empleados/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empleado.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.empleadoRepository.departamentos(id).patch(departamento, where);
  }

  @del('/empleados/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Empleado.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.empleadoRepository.departamentos(id).delete(where);
  }
}
