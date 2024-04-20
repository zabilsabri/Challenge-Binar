const response = require('../../utils/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async createAccount(req, res) {
        try {
            const { bank_name, bank_account_number, balance, user_id} = req.body;

            if(!bank_name || !bank_account_number || !balance || !user_id){
                return res.status(400).json(response('error', 'All fields are required'));
            }

            const exist = await prisma.bank_accounts.findUnique({
                where:{
                    bank_account_number: bank_account_number
                }
            });

            if(exist){
                return res.status(400).json(response('error', 'Bank Account already exist'));
            }

            const userExist = await prisma.users.findUnique({
                where:{
                    id: user_id
                }
            });

            if(!userExist){
                return res.status(404).json(response('error', 'User not found'));
            }

            const account = await prisma.bank_accounts.create({
                data: {
                    bank_name: bank_name,
                    bank_account_number: bank_account_number,
                    balance: balance,
                    user_id: user_id
                }
            })
            res.status(201).json({
                status: 'success',
                message: `Successfully insert data for ${account.bank_name}`,
                data: account.id // Untuk Integration Testing
            });
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    async getAccounts(req, res) {
        try {
            const accounts = await prisma.bank_accounts.findMany()
            res.status(200).json(response('success', accounts));
        } catch (error) {
            res.status(400).json(response('error', error.message))
        }
    },

    async getAccount(req, res){
        try {
            const {id} = req.params;
            const exist = await prisma.bank_accounts.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(!exist){
                return res.status(404).json(response('error', 'Account not found'))
            }

            res.status(200).json(response('success', exist))

        } catch (error) {
            res.status(400).json(response('error', error.message))
        }
    }

};