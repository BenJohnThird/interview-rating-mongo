import mongoose, { Schema, Document, Model } from 'mongoose';
import { compareValue, hashValue } from '../utils/bcrypt';

export interface IUsers extends mongoose.Document {
    email: string;
    password: string;
    comparePassword(val: string): Promise<boolean>;
}

// Model is from mongoose.Model
interface IUsersModelInterface extends Model<IUsers> {
    // declare any static methods here
    login(email: string, password: string): any; // this should be changed to the correct return type if possible.
}

const UserSchema: Schema = new mongoose.Schema<IUsers>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
});


// Function after user has been saved
UserSchema.post('save', (doc: Document, next) => {
    next();
});

// eslint-disable-next-line @typescript-eslint/typedef
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await hashValue(this.password as string);
    return next();
});

UserSchema.methods.comparePassword = async function(val: string) {
    return compareValue(val, this.password);
};

UserSchema.statics.login = async function(email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user) {
        return;
    }

    const auth = await compareValue(password, user.password);
    if (!auth) {
        return;
    }

    return user;
};

const User = mongoose.model<IUsers, IUsersModelInterface>(
    'User',
    UserSchema
);

export default User;
