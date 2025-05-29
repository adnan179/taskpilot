import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string; // plaintext for this practice (not secure)
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', UserSchema);
