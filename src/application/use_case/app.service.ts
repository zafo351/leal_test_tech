/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */
import {
  CreateCommerce,
  CreateUser,
  CreateCampain,
  CreateSuc,
} from "../../domain/request.dto";

import { UserRepository } from "../../interface/controller/app.repositories";
import { campain } from "../../domain/db.model";
import { PrismaClient } from "@prisma/client";

export class UserService {
  dbclient=new PrismaClient();
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUser): Promise<any> {
    try {
      const newUser = await this.dbclient.usuarios.create({data: user});
      await this.dbclient.billetera.create({data:{id_bil: user.id_bil,coins: 0,id_usu: user.id_usu}});
      return newUser;
    } catch(error){
      console.log(error)
    }
  }

  async createCampain(campainn: CreateCampain): Promise<void> {
    try {
      this.dbclient.campain.create({data:campainn})
    } catch(error){
      console.log(`Error de consumo en base de datos ${error}`)
    }
  }

  async createSuc(sucursal: CreateSuc): Promise<void> {
    const resSucu = this.dbclient.sucursales.create({data:sucursal})
  }

  async createCommerce(commerce: CreateCommerce): Promise<void> {
    return this.userRepository.createCommerce(commerce);
  }

  async getCampains(): Promise<campain[]> {
    return this.userRepository.findCampains();
  }

  async getUsers(): Promise<void> {
    const usuariosGet = this.dbclient.usuarios.findMany();
    console.log(usuariosGet)
  }
}
