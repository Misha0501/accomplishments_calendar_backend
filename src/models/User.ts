import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
    calendars: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    calendars: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }]
});

userSchema.pre<IUser>('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = model<IUser>('User', userSchema);

export default User;
