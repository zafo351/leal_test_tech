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
import { billetera } from "./db.model";
import { UUID } from "sequelize";

/**
 *  @description
 *
 *  @author Yilder Nicolas Perdomo
 *  @date 24/09/2023
 *
 */


@Table
export class usuarios extends Model<usuarios> {
  @PrimaryKey
  @AutoIncrement
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