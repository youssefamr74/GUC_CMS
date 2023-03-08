const server = require('../index.js');
const app = server.app;
const supertest = require('supertest');
const mongoose = require("mongoose");
const product = require('../Product.js');
const request = supertest(app);

beforeAll(async ()=>{
    await mongoose.connect('mongodb://AdvancedDatabase:db704@cluster0-shard-00-00.zg2uc.mongodb.net:27017,cluster0-shard-00-01.zg2uc.mongodb.net:27017,cluster0-shard-00-02.zg2uc.mongodb.net:27017/DBTest?ssl=true&replicaSet=atlas-5zd8r7-shard-0&authSource=admin&retryWrites=true&w=majority')
})

beforeEach(async ()=>{
    await product.deleteMany();
})

describe('Test 10 Routes',()=>{

    it('tests the products route (1)',async()=>{            //1
        const p = new product({  
            id:1,   
            name:"Sample Product",
            quantity:10,
            price:100,
            rating:[],
            currentRating:5
        })
        await p.save();
        const response = await request.get('/products')
        expect(response.body.length).toBe(1);
        const temp = response.body[0];
        expect(temp.id).toBe(1);
        expect(temp.name).toBe("Sample Product");
        expect(temp.quantity).toBe(10);
        expect(temp.price).toBe(100);
        const flag =true;

        expect(flag).toBe(true);
        expect(temp.currentRating).toBe(5);
    })

    it('tests the delete product by id route (2)',async()=>{
        const p = new product({  
            id:1,   
            name:"Sample Product",
            quantity:10,
            price:100,
            rating:[],
            currentRating:5
        })
        await p.save();
        await request.delete('/product/1');
        const output = await product.find();
        expect(output.length).toBe(0);
    }) 




})