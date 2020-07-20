import * as autopopulate from "mongoose-autopopulate";
import { prop, Ref, getModelForClass, plugin } from "@typegoose/typegoose";

import { Incident } from "./incident";

@plugin(autopopulate as any)
class Ong {
  @prop()
  id: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  wpp: string;

  @prop()
  city: string;

  @prop()
  uf: string;

  @prop({ ref: () => Incident, autopopulate: true, type: Incident })
  incidents?: Ref<Incident[]>;
}

export default getModelForClass(Ong);
