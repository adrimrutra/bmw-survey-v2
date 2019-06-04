import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';


export class Survey extends Typegoose {

    @prop({ required: true, min: 0, max: 100 })
    age: Number;

    @prop({ required: true })
    gender: String;

    @prop({ required: false })
    license: String;

    @prop({ required: true })

    first_car: String;

    @prop({ required: false })
    drivetrain: String;

    @prop({ required: false })
    drifting: String;

    @prop({ required: false })
    how_many: Number;

    // @prop({ required: false, match: '(^[M]\d{3}[d|i])$|(^[X|Z]\d{1}$)' })
    @arrayProp({ items: String })
    carmodels: String [];
}

