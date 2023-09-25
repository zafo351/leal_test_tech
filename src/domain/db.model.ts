import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  NotNull,
} from "sequelize-typescript";

/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */

@Table
export class billetera extends Model<billetera> {
  @PrimaryKey
  @Column(DataType.NUMBER)
  id_bill!: number;

  @Column(DataType.NUMBER)
  coins: number = 0;

  @ForeignKey(() => usuarios)
  @Column(DataType.NUMBER)
  id_usu!: number;
}

@Table
export class usuarios extends Model<usuarios> {
  @Column({ type: DataType.NUMBER })
  id_usu!: number;

  @Column({ type: DataType.STRING })
  nameuser!: string;

  @Column({ type: DataType.NUMBER })
  cc!: number;

  @ForeignKey(() => billetera)
  @Column({ type: DataType.NUMBER })
  id_bill!: number;
}

@Table
export class campain extends Model<campain> {
  @PrimaryKey
  @Column(DataType.NUMBER)
  id_cam: number = 0;

  @Column(DataType.STRING)
  nombre_cam: string = "";

  @ForeignKey(() => sucursales)
  @Column(DataType.NUMBER)
  id_suc!: number;
}

@Table
export class sucursales extends Model<sucursales> {
  @PrimaryKey
  @Column(DataType.NUMBER)
  id_suc: number = 0;

  @Column(DataType.STRING)
  namesuc: string = "";

  @ForeignKey(() => usuarios)
  @Column(DataType.NUMBER)
  id_usu!: number;
}

@Table
export class comercio extends Model<comercio> {
  @PrimaryKey
  @Column(DataType.NUMBER)
  id_com: number = 0;

  @Column(DataType.STRING)
  nombre_com: string = "";

  @ForeignKey(() => campain)
  @Column(DataType.NUMBER)
  id_cam!: number;

  @ForeignKey(() => sucursales)
  @Column(DataType.NUMBER)
  id_suc!: number;
}
