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
import { usuarios } from "./db.model";

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