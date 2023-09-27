import { UserService } from "../../../src/application/use_case/app.service";

// Mock UserRepository
const mockUserRepository = {
  id_usu: 1,
  nameuser: "userpro",
  cc: 122,
};

const mockCampainsRepository = {
  "id_cam": 2,
  "nombre_cam": "userpro",
  "id_suc": 2,
  "id_com":1
  };

const mockUserRepositoryBad = {
  id_usu: 1,
  nameuser: "userpro",
  cc: 122,
};

describe("UserService", () => {
  let userService: UserService;

  describe("createUser", () => {
    it("debe crear un nuevo usuario", async () => {
      const user = mockUserRepository;
      const newUser = await userService.createUser(user);
      expect(newUser).toBeDefined();
    });

    it("debe manejar errores al crear un usuario", async () => {
      const user = mockUserRepositoryBad;
      const error = new Error("Error simulado");
      userService.dbclient.usuarios.create = jest.fn().mockRejectedValue(error);

      try {
        await userService.createUser(user);
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  describe("createCampain", () => {
    it("debe crear un nuevo usuario", async () => {
      const campainn = mockCampainsRepository;
      const campNew = await userService.createCampain(campainn);
      expect(campNew).toBeDefined();
    });

    it("debe manejar errores al crear un campana", async () => {
      const user = mockUserRepositoryBad;
      const error = new Error("Error simulado");
      userService.dbclient.usuarios.create = jest.fn().mockRejectedValue(error);

      try {
        await userService.createUser(user);
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });
});
