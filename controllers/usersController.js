const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../middleware/errors');

exports.signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            throw new CustomError('User already exists', 400);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(process.env.GEN_VALUE);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user in DB
        user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        // Create a JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' }, (error, token) => {
            if (error) throw new CustomError(error.message, 400);
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            throw new CustomError('Invalid credentials', 400);
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new CustomError('Invalid credentials', 400);
        }

        // Create a JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' }, (error, token) => {
            if (error) throw new CustomError(error.message, 400);
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

exports.currentUser = async (req, res, next) => {
    try {
        const userId = jwt.verify(req.get('x-auth-token'), process.env.SECRET_KEY).user.id;        
        const user = await User.findById(userId);
        
        res.status(201).json( {id: user._id} );
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};