import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Turnos} from '../models';
import {TurnosRepository} from '../repositories';

export class TurnosController {
  constructor(
    @repository(TurnosRepository)
    public turnosRepository : TurnosRepository,
  ) {}

  @post('/turnos')
  @response(200, {
    description: 'Turnos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Turnos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {
            title: 'NewTurnos',
            exclude: ['idTurno'],
          }),
        },
      },
    })
    turnos: Omit<Turnos, 'idTurno'>,
  ): Promise<Turnos> {
    return this.turnosRepository.create(turnos);
  }

  @get('/turnos/count')
  @response(200, {
    description: 'Turnos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Turnos) where?: Where<Turnos>,
  ): Promise<Count> {
    return this.turnosRepository.count(where);
  }

  @get('/turnos')
  @response(200, {
    description: 'Array of Turnos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Turnos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Turnos) filter?: Filter<Turnos>,
  ): Promise<Turnos[]> {
    return this.turnosRepository.find(filter);
  }

  @patch('/turnos')
  @response(200, {
    description: 'Turnos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {partial: true}),
        },
      },
    })
    turnos: Turnos,
    @param.where(Turnos) where?: Where<Turnos>,
  ): Promise<Count> {
    return this.turnosRepository.updateAll(turnos, where);
  }

  @get('/turnos/{id}')
  @response(200, {
    description: 'Turnos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Turnos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Turnos, {exclude: 'where'}) filter?: FilterExcludingWhere<Turnos>
  ): Promise<Turnos> {
    return this.turnosRepository.findById(id, filter);
  }

  @patch('/turnos/{id}')
  @response(204, {
    description: 'Turnos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Turnos, {partial: true}),
        },
      },
    })
    turnos: Turnos,
  ): Promise<void> {
    await this.turnosRepository.updateById(id, turnos);
  }

  @put('/turnos/{id}')
  @response(204, {
    description: 'Turnos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() turnos: Turnos,
  ): Promise<void> {
    await this.turnosRepository.replaceById(id, turnos);
  }

  @del('/turnos/{id}')
  @response(204, {
    description: 'Turnos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.turnosRepository.deleteById(id);
  }
}
