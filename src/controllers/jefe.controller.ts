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
import {Jefe} from '../models';
import {JefeRepository} from '../repositories';

export class JefeController {
  constructor(
    @repository(JefeRepository)
    public jefeRepository : JefeRepository,
  ) {}

  @post('/jefes')
  @response(200, {
    description: 'Jefe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jefe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefe, {
            title: 'NewJefe',
            exclude: ['idJefe'],
          }),
        },
      },
    })
    jefe: Omit<Jefe, 'idJefe'>,
  ): Promise<Jefe> {
    return this.jefeRepository.create(jefe);
  }

  @get('/jefes/count')
  @response(200, {
    description: 'Jefe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jefe) where?: Where<Jefe>,
  ): Promise<Count> {
    return this.jefeRepository.count(where);
  }

  @get('/jefes')
  @response(200, {
    description: 'Array of Jefe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jefe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jefe) filter?: Filter<Jefe>,
  ): Promise<Jefe[]> {
    return this.jefeRepository.find(filter);
  }

  @patch('/jefes')
  @response(200, {
    description: 'Jefe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefe, {partial: true}),
        },
      },
    })
    jefe: Jefe,
    @param.where(Jefe) where?: Where<Jefe>,
  ): Promise<Count> {
    return this.jefeRepository.updateAll(jefe, where);
  }

  @get('/jefes/{id}')
  @response(200, {
    description: 'Jefe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jefe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Jefe, {exclude: 'where'}) filter?: FilterExcludingWhere<Jefe>
  ): Promise<Jefe> {
    return this.jefeRepository.findById(id, filter);
  }

  @patch('/jefes/{id}')
  @response(204, {
    description: 'Jefe PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefe, {partial: true}),
        },
      },
    })
    jefe: Jefe,
  ): Promise<void> {
    await this.jefeRepository.updateById(id, jefe);
  }

  @put('/jefes/{id}')
  @response(204, {
    description: 'Jefe PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jefe: Jefe,
  ): Promise<void> {
    await this.jefeRepository.replaceById(id, jefe);
  }

  @del('/jefes/{id}')
  @response(204, {
    description: 'Jefe DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jefeRepository.deleteById(id);
  }
}
