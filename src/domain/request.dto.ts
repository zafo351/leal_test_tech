

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
}

export interface CreateUser {
  id_usu: number;
  nameuser: string;
  cc: number;
}

export interface CreateCampain {
  id_cam: number;
  nombre_cam: string;
  id_suc: number;
  id_com: number;
}

export interface CreateSuc {
  id_suc: number;
  namesuc: string;
  id_com: number;
}

export interface updateCash {
  id_bil:number;
  coins: number;
  id_com:number;
}

export interface updateCommerceCash {
  id_bil:number;
  id_com: number;
}
