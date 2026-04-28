import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const newUser = await signUp({ email, password, role });
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function logInHandler(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const { token, user } = await logIn({ email, password });
        res.status(200).json({ token, user });
        
    } catch (err) {
        if (err.code === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}
