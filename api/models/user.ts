import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';
//import * as bcrypt from 'bcrypt';

export class User extends Typegoose {
    @prop({ required: true })
    name: String;

    @prop({ required: true, unique: true })
    email: String;

    @prop({ required: true })
    password: String;
}


// export const createUser = (newUser, callback) => {
//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//     });
//   };

