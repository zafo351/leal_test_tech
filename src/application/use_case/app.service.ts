/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */

import { usuarios } from "../../domain/user.model";
import {
  CreateCommerce,
  CreateUser,
  CreateCampain,
  CreateSuc,
} from "../../domain/request.dto";

import { UserRepository } from "../../interface/controller/app.repositories";
import { campain } from "../../domain/db.model";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { Optional } from "sequelize";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUser): Promise<void> {
    const newUser:CreateUser = {
      id_usu: user.id_usu,
      nameuser: user.nameuser,
      cc: user.cc,
      id_bill: user.id_bill,
    };
    // const newUser = new usuarios(
    // );
    // newUser.id_usu = user.id_usu
    // newUser.nameuser = user.nameuser
    // newUser.cc = user.cc
    // newUser.id_bill = user.id_bill

    await usuarios.create(newUser as Optional<usuarios, NullishPropertiesOf<usuarios>>);
  }

  async createCampain(campainn: CreateCampain): Promise<void> {
    return this.userRepository.createCampain(campainn)
  }

  async createSuc(sucursal: CreateSuc): Promise<void> {
    return this.userRepository.createSuc(sucursal);
  }

  async createCommerce(commerce: CreateCommerce): Promise<void> {
    return this.userRepository.createCommerce(commerce);
  }

  async getCampains(): Promise<campain[]> {
    return this.userRepository.findCampains();
  }

  async getUsers(): Promise<usuarios[]> {
    return this.userRepository.findUsuarios();
  }
}
