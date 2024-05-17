import { IUser } from '../models/User';

declare global {
    namespace Express {
        interface User extends IUser {}  // Extends Express' User interface with our IUser interface
    }
}
