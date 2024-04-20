const { PrismaClient } = require('@prisma/client')
const app = require('../../index')
const request = require('supertest')

const prisma = new PrismaClient()

describe('API Testing', () => {
    let userId = null;
    let accountId = null;
    let transactionId = null;
    let token = null;

    // remove all users
    beforeAll(async () => {
        await prisma.users.deleteMany();
    });

    test('Create User', async () => {
        const res = await request(app)
            .post('/v1/user')
            .send({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123',
                identity_type: 'KTP',
                identity_number: '123',
                address: 'Jakarta'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.status).toEqual('success')
        userId = res.body.data
    });

    test('Get Users', async () => {
        const res = await request(app)
            .get('/v1/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    });

    test('Get User', async () => {
        const res = await request(app)
            .get(`/v1/user/${userId}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.id).toEqual(userId)
    });

    test('Create Account', async () => {
        const res = await request(app)
            .post('/v1/account')
            .send({
                bank_name: 'BCA',
                bank_account_number: '1234567890',
                balance: 1000000,
                user_id: userId
            })

        expect(res.statusCode).toEqual(201)
        expect(res.body.status).toEqual('success')
        accountId = res.body.data
    });

    test('Get Accounts', async () => {
        const res = await request(app)
            .get('/v1/accounts')
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    });

    test('Get Account', async () => {
        const res = await request(app)
            .get(`/v1/account/${accountId}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.id).toEqual(accountId)
    });

    test('Create Transaction', async () => {
        const res = await request(app)
            .post('/v1/transaction')
            .send({
                amount: 50000,
                bank_account_source: accountId,
                bank_account_destination: accountId
            })

        expect(res.statusCode).toEqual(201)
        expect(res.body.status).toEqual('success')
        transactionId = res.body.data
    });

    test('Get Transactions', async () => {
        const res = await request(app)
            .get('/v1/transactions')
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    });

    test('Get Transaction', async () => {
        const res = await request(app)
            .get(`/v1/transaction/${transactionId}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    });

    test('Register', async () => {
        const res = await request(app)
            .post('/v1/auth/register')
            .send({
                name: 'John Doe 2',
                email: 'johndoe2@gmail.com',
                password: '123'
            })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body.status).toEqual('success')

    });

    test('Login', async () => {
        const res = await request(app)
            .post('/v1/auth/login')
            .send({
                email: 'johndoe2@gmail.com',
                password: '123'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body).toHaveProperty('token')
        token = res.body.token
    });

    test('Authenticate', async () => {
        const res = await request(app)
            .get('/v1/auth/authenticate')
            .set('Authorization', 'Bearer ' + token)
            
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('success')
    })

});