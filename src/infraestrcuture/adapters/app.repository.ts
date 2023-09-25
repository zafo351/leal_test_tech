import {
  usuarios,
  comercio,
  billetera,
  campain,
  sucursales,
} from "../../domain/db.model";
import { UserRepository } from "../../interface/controller/app.repositories";

export class InMemoryUserRepository implements UserRepository {
  private commerces: comercio[] = [];
  users: usuarios[] = [];
  campains: campain[] = [];
  sucursaless: sucursales[] = [];

  async createUser(user: usuarios): Promise<void> {
    this.users.push(user);
  }

  async createCampain(camp: campain): Promise<void> {
    this.campains.push(camp);
  }

  async createSuc(sucu: sucursales): Promise<void> {
    this.sucursaless.push(sucu);
  }

  async createCommerce(comm: comercio): Promise<void> {
    this.commerces.push(comm);
  }

  async findUsuarios(): Promise<usuarios[]> {
    return this.users;
  }

  async findCampains(): Promise<campain[]> {
    return this.campains;
  }
}
