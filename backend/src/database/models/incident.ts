import { prop, getModelForClass } from "@typegoose/typegoose";

export class Incident {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  value: number;

  @prop()
  ongId: string;
}

export default getModelForClass(Incident);
