import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDto } from './dto/idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}
  // get all ideas
  async getIdeas(): Promise<IdeaEntity[]> {
    return await this.ideaRepository.find();
  }
  // create idea
  async createIdea(data: IdeaDto): Promise<IdeaEntity> {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }
  // update idea
  async updateIdea(id: string, data: Partial<IdeaDto>): Promise<IdeaEntity> {
    await this.ideaRepository.update({ id }, data);
    return this.ideaRepository.findOne(id);
  }
  // get idea
  async read(id: string): Promise<IdeaEntity> {
    return await this.ideaRepository.findOne(id);
  }
  // delete idea
  async delete(id: string) {
    await this.ideaRepository.delete({id});
    return { message: `Idea with ID: ${id} was deleted` };
  }
}
