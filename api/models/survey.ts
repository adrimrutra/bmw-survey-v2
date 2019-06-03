import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';


export class Survey extends Typegoose {

   // @prop({ required: true, min: 0, max: 100 })
    @prop()
    age: Number;

  //  @prop({ required: true })
    @prop()
    gender: string;

   // @prop({ required: true })
    @prop()
    license: string;

   // @prop({ required: true })
    @prop()
    first_car: string;

   // @prop({ required: true })
    @prop()
    drivetrain: string;

   // @prop({ required: true })
    @prop()
    drifting: string;

   // @prop({ required: true })
    @prop()
    how_many: Number;

   // @prop({ match: '(^[M]\d{3}[d|i])$|(^[X|Z]\d{1}$)' })
    @prop()
    carmodels: [string];
}

