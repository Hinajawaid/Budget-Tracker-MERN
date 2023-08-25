import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  budget: number;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    budget: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel: Model<IUser> = mongoose.model("User", UserSchema);

export default UserModel;
