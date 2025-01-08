import { Schema } from 'mongoose';
import { TUser } from './user.interface';
import validator from 'validator';
import { model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

// Schema for UserName

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not e valid email type',
      },
    },
    password: {
      type: String,
      maxlength: [20, 'Password can not be more than 20 character'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    phone: { type: String, required: [true, 'Contact Number is required'] },
    address: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // mongoose give us created at and updated at for this timestamps
  {
    timestamps: true,
  },
);

// //virtual
// userSchema.virtual('fullName').get(function () {
//   return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
// });

// hash password before save the data
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Create user Model
export const User = model<TUser>('User', userSchema);
