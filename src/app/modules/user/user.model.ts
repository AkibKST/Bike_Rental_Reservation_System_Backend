import { Schema } from 'mongoose';
import { TUserName, TUser } from './user.interface';
import validator from 'validator';
import { model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

// Sub-schema for UserName
const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //Akib
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: UserNameSchema,
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

//virtual
userSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

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
