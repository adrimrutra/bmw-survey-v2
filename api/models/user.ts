import { prop, Typegoose, ModelType, InstanceType, Ref, arrayProp, plugin, pre } from 'typegoose';

import * as bcrypt from 'bcrypt';

class User extends Typegoose {
    //@prop({ required: true })
   // local: {
   //     email: String;
    //    password: String;
   // };

  //  @prop({ required: true })
   // name: String;

    @prop({ required: true, unique: true })
    email: String;

    @prop({ required: true })
    password: String;
}
export const UserModel = new User().getModelForClass(User);

// generating a hash

// export const generateHash = (password: any) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };


// checking if password is valid
// export const validPassword1 = function(password: any) {
//     return bcrypt.compareSync(password, this.local.password);
// };



// export const comparePassword = (password, hash, callback) => {
//         bcrypt.compare(password, hash,  (err, isMatch) => {
//                 if(err) {
//                     throw err;
//         }
//         callback(null, isMatch);
//     });
// };



// export const createUser = (newUser, callback) => {
//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//     });
// };

