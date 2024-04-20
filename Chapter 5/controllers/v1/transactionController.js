const response = require('../../utils/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async createTransaction(req, res) {
        try {
            const { amount, bank_account_source, bank_account_destination } = req.body;

            if(!amount || !bank_account_source || !bank_account_destination){
                return res.status(400).json(response('error', 'All fields are required'));
            }
            
            const checkSource = await prisma.bank_accounts.findUnique({
                where: {
                    id: parseInt(bank_account_source)
                }
            })

            if(!checkSource){
                return res.status(404).json(response('error', 'Bank account source not found'))
            }

            const checkDestination = await prisma.bank_accounts.findUnique({
                where: {
                    id: parseInt(bank_account_destination)
                }
            })

            if(!checkDestination){
                return res.status(404).json(response('error', 'Bank account destination not found'))
            }
            
            const transaction = await prisma.transactions.create({
                data: {
                    amount: amount,
                    source_account_id: parseInt(bank_account_source),
                    destination_account_id: parseInt(bank_account_destination)
                }
            })
            res.status(201).json({
                status: 'success',
                message: `Successfully insert data for transaction`,
                data: transaction.id // Untuk Integration Testing
            });
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    async getTransactions(req, res) {
        try {
            const transactions = await prisma.transactions.findMany()
            res.status(200).json(response('success', transactions));
        } catch (error) {
            res.status(400).json(response('error', error.message))
        }
    },

    async getTransaction(req, res){
        try {
            const {id} = req.params;
            const exist = await prisma.transactions.findUnique({
                where: {
                    id: parseInt(id)
                },
                select: {
                    amount: true,
                    bank_account_source: true,
                    bank_account_destination: true
                }
            })

            if(!exist){
                return res.status(404).json(response('error', 'Transaction not found'))
            }

            res.status(200).json(response('success', exist))

        } catch (error) {
            res.status(400).json(response('error', error.message))
        }
    }

}