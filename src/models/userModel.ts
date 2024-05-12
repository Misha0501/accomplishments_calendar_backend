import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;  // Optional since it won't exist on all existing documents
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // Regex for email validation
    },
    password: { type: String, required: true },
}, {
    timestamps: true  // This will add `createdAt` and `updatedAt` fields automatically
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
