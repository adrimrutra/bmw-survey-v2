import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';

export class User extends Typegoose {

    @prop({ required: true })
    _id: String;

    @prop({ required: true })
    name: String;

    @prop({ required: true })
    email: String;

    @prop({ required: true })
    password: String;
}

