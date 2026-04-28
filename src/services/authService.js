import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepo.js'

export async function signUp({ email, password, role = 'user' }) {
    const exisiting = await userRepo.findUserByEmail(email);
    if (exisiting) {
        throw { code: 'EMAIL_EXISTS'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ email, hashedPassword, role });
    return user;
}

export async function logIn({ email, password }) {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
        throw { code: 'INVALID_CREDENTIALS' };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw { code: 'INVALID_CREDENTIALS' };
    }

    const token = jwt.sign({ 
        userId: user.user_id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    return { 
        token, 
        user: { user_id: user.user_id, email: user.email, role: user.role } 
    };
}