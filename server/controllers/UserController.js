const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const cloudinary = require('cloudinary').v2
const { User, Departement } = require('../models');
const { OAuth2Client } = require('google-auth-library');

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            const { fullName, email, password } = req.body;
            const user = await User.create({ fullName, email, password });
            res.status(201).json({ 
                id: user.id, 
                email: user.email,
                fullName: user.fullName
            });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw { name: 'BadRequest', message: 'Email is required' };
            }
            if (!password) {
                throw { name: 'BadRequest', message: 'Password is required' };
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { name: 'Unauthorized', message: 'Invalid Email/Password' };
            }
            const isPasswordValid = comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw { name: 'Unauthorized', message: 'Invalid Email/Password' };
            }

            const access_token = signToken({
                id: user.id,
                email: user.email
            })
            
            res.json({ access_token });

        } catch (error) {;
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers;
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const gPayload = ticket.getPayload();

            if (!gPayload.email_verified) {
                throw { name: 'Unauthorized', message: 'Unverified Google account' };
            }

            const [user, created] = await User.findOrCreate({
                where: { 
                    email: gPayload.email
                },
                defaults: {
                    email: gPayload.email,
                    password: "google_password"
                }
            })

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = signToken(payload);

            res.json({ access_token });
        } catch (error) {
            next(error);
        }
    }

    static async profile(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId, {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
                include: {
                    model: Departement,
                    attributes: ['departementName']
                }
            })

            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { fullName, imageProfile, phoneNumber, departementId } = req.body;
            const userId = req.user.id;
            const user = await User.findByPk(userId);

            await user.update({ fullName, imageProfile, phoneNumber, departementId },
                { where: { userId } }
            );

            res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            next(error);

        }
    }

    static async updateImageProfile(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                throw { name: 'NotFound', message: 'User not found' };
            }
            if (!req.file) {
                throw { name: 'BadRequest', message: 'No file uploaded' };
            }

            const base64 = req.file.buffer.toString('base64'); // Convert data gambar ke memori sebagai string base64
            const dataURI = `data:${req.file.mimetype};base64,${base64}`; // Buat data URI
            const result = await cloudinary.uploader.upload(dataURI)

            await user.update({
                imageProfile: result.secure_url
            })

            res.json({ message: 'Image profile updated successfully' });

        } catch (error) {
            next(error);
        }
    }
}