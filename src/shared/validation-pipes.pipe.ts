import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No body submitted',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${this.formatError(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatError(errors: any[]) {
    return errors
      .map(err => {
        for (const prop in err.constraints) {
          return err.constraints[prop];
        }
      })
      .join(', ');
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) return false;

    return true;
  }
}
