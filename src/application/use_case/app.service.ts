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
  updateCash,
} from "../../domain/request.dto";

import { UserRepository } from "../../interface/controller/app.repositories";
import { campain } from "../../domain/db.model";
import { PrismaClient } from "@prisma/client";

export class UserService {
  dbclient = new PrismaClient();
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUser): Promise<any> {
    try {
      const newUser = await this.dbclient.usuarios.create({ data: user });
      await this.dbclient.billetera.create({
        data: { id_bil: user.id_usu, coins: 0, id_usu: user.id_usu },
      });
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async createCampain(campainn: CreateCampain): Promise<any> {
    try {
      const newCamp = await this.dbclient.campain.create({ data: campainn });
      return newCamp;
    } catch (error) {
      console.log(`Error de consumo en base de datos ${error}`);
    }
  }

  async createSuc(sucursal: CreateSuc): Promise<any> {
    try {
      const resSucu = await this.dbclient.sucursales.create({ data: sucursal });
      return resSucu;
    } catch (error) {
      console.log(`Error de consumo en base de datos ${error}`);
    }
  }

  async createCommerce(commerce: CreateCommerce): Promise<any> {
    try {
      const resCommerce = await this.dbclient.comercio.create({
        data: commerce,
      });
      return resCommerce;
    } catch (error) {
      console.log(`Error de consumo en base de datos ${error}`);
    }
  }

  async updateCash(uCash: updateCash): Promise<any> {
    return this.dbclient.billetera.update({
      where: { id_bil: uCash.id_bil },
      data: { coins: uCash.coins },
    });
  }

  async getCampains(): Promise<any> {
    return this.dbclient.campain.findMany();
  }

  async getUsers(): Promise<any> {
    const usuariosGet = this.dbclient.usuarios.findMany();
    return usuariosGet;
  }
}
