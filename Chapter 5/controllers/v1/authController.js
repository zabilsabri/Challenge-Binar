const hashPassword = require('../../utils/hashPassword');
const response = require('../../utils/response');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const prisma = new PrismaClient();

module.exports = {
    async register(req, res, next) {
        try {

            const { name, email, password  } = req.body;

            if(!name || !email || !password){
                return res.status(400).json(response('error', 'All fields are required!'));
            }

            const hashedPassword = await hashPassword(password);

            const exist = await prisma.users.findUnique({
                where:{
                    email: email
                }
            });

            if(exist){
                return res.status(400).json(response('error', 'Email already exist'));
            }

            const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            });

            res.status(201).json({
                status: 'success',
                message: `Successfully register for ${user.name}`,
            });
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    async login(req, res, next) {
        try {
           const { email, password } = req.body;

            if(!email || !password){
                return res.status(400).json(response('error', 'All fields are required!'));
            }

            const user = await prisma.users.findUnique({
            where: {
                    email: email
            }
            });

            if(!user){
                return res.status(401).json(response('error', 'Invalid Email or Password!'));
            }

            let isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch){
                return res.status(401).json(response('error', 'Invalid Email or Password!'));
            }

            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            return res.status(200).json({
                status: 'success',
                message: 'Successfully login',
                token: token
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async whoAmI(req, res, next) {
        try {
            return res.json({
                status: 'success',
                message: 'Successfully authenticate'
            });
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    }
};