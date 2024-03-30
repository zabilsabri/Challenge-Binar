const hashPassword = require('../../utils/hashPassword');
const response = require('../../utils/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createUser(req, res) {
        try {

            const { name, email, password, identity_type, identity_number, address, user_id  } = req.body;
            const hashedPassword = await hashPassword(password);

            const exist = await prisma.users.findUnique({
                where:{
                    email: email
                }
            });

            if(exist){
                return res.status(400).json(response('error', 'Email already exist'));
            }

            // Cara 1
            /* const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    profiles: {
                        create: {
                            user_id: user_id,
                            identity_type: identity_type,
                            identity_number: identity_number,
                            address: address
                        }
                    }
                },
            }); */

            // Cara 2
            const user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            })
            await prisma.profiles.create({
                data: {
                    user_id: user.id, // Agar tidak perlu menginput user_id pada body
                    identity_type: identity_type,
                    identity_number: identity_number,
                    address: address
                }
            })

            res.status(201).json(response('success', `Successfully insert data for ${user.name}`));
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    async getUsers(req, res) {
        try {
            const users = await prisma.users.findMany({
                select: {
                    name: true,
                    email: true,
                }
            });
            res.status(200).json(response('success', users));
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.users.findUnique({
                where: {
                    id: parseInt(id),
                },
                include:{
                    profiles: true
                }
            });

            if (!user) { 
                return res.status(404).json(response('error', 'User not found'));
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};