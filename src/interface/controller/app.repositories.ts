/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */

import {
  usuarios,
  comercio,
  billetera,
  campain,
  sucursales,
} from "../../domain/db.model";
import {
  CreateUser,
  CreateCampain,
  CreateCommerce,
  CreateSuc,
} from "../../domain/request.dto";

export interface UserRepository {
  createUser(user: CreateUser | usuarios): Promise<void>;
  createCampain(camp: CreateCampain | campain): Promise<void>;
  createSuc(sucu: CreateSuc | sucursales): Promise<void>;
  createCommerce(comm: CreateCommerce | comercio): Promise<void>;
  findCampains(): Promise<campain[]>;
  findUsuarios(): Promise<usuarios[]>;
}
