import { Authentication } from '@app/entities/authentication.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthenticationRepository extends Repository<Authentication> {
  constructor(private readonly dataSource: DataSource) {
    super(Authentication, dataSource.createEntityManager());
  }

  findByIdWithUser(id: string): any {
    return this.dataSource
      .createQueryBuilder(Authentication, 'auth')
      .select([
        'auth.id AS id',
        'auth.socialType AS socialType',
        'auth.email AS email',
        'auth.created_time AS createdTime',
        'auth.updated_time AS lastLoginedTime',
        'user.id AS userId',
        'user.nickname AS nickname',
      ])
      .where('auth.id = :id', { id })
      .andWhere('auth.deleted_time is NULL')
      .leftJoin('auth.user', 'user')
      .getRawOne();
  }
}
