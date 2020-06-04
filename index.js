const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


const dbUsers = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = `mongodb+srv://${dbUsers}:${pass}@cluster0-94p8s.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Ashik','Rohim', 'Korim', 'Jobbar','Kobir','Ashik']




app.get('/products', (req, res) =>{
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
       
        collection.find({name:'iPhone'}).limit(22).toArray((err, documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
                
            }else{
                res.send(documents);
            }
            
        });
    
        client.close();
      });
    
});


app.get('/users/:id',(req, res)=>{

    const id = req.params.id;
    console.log(req.query.sort);
    
    const name = users[id];
    res.send({id,name});
    
})
 

// post 
app.post('/addProduct', (req, res)=>{
    const client = new MongoClient(uri, { useNewUrlParser: true });
  const product = req.body;
 

  client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
   
    collection.insertOne(product,(err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send({massage:err});
            
        }else{
            res.send(result.ops[0]);
        }
        
    });

    client.close();
  });

});
const port = process.env.PORT || 4200;
app.listen(port, () => console.log('LisTenting to port 4200'));