/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */

import { User } from '../../domain/data';

export interface UserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
