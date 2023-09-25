

/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */


import { User } from '../../domain/data';
import { UserRepository } from '../../interface/controller/app.controller';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: User): Promise<void> {
    await this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
