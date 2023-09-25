/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date Mayo-13 del 2022
 *
 */

export interface CreateCommerce {
  id_com: number;
  nombre_com: string;
  id_cam: number;
  id_suc: number;
}

export interface CreateUser {
  id_usu: number;
  nameuser: string;
  cc: number;
  id_bill: number;
}

export interface CreateCampain {
  id_cam: number;
  nombre_cam: string;
  id_suc: number;
}

export interface CreateSuc {
  id_suc: number;
  namesuc: string;
  id_usu: number;
}
