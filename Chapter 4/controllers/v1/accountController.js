const response = require('../../utils/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async createAccount(req, res) {
        try {
            const { bank_name, bank_account_number, balance, user_id} = req.body;
            const account = await prisma.bank_accounts.create({
                data: {
                    bank_name: bank_name,
                    bank_account_number: bank_account_number,
                    balance: balance,
                    user_id: user_id
                }
            })
            res.status(201).json(response('success', `Successfully insert data for ${account.bank_name}`));
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