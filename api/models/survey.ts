import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';


export class Survey extends Typegoose {

    @prop({ required: true })
    age: Number;

    @prop({ required: true })
    gender: string;

    @prop({ required: true })
    license: string;

    @prop({ required: true })
    first_car: string;

    @prop({ required: true })
    drivetrain: string;

    @prop({ required: true })
    drifting: string;

    @prop({ required: true })
    how_many: Number;

    @prop({ required: true })
    carmodels: [string];
}

