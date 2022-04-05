const Express = require("express");
const cors = require('cors');
const BodyParser = require("body-parser");
const {request} = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://mongo:27017";
const DATABASE_NAME = "todoList";

var app = Express(), database, collection;
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.options('*', cors());

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("tarefas");
        console.log(`Conectado a ${DATABASE_NAME}!`);
    });
});

/** Visualizar tarefas **/
app.get("/tarefas", cors(), (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.json(result);
    });
});

/** Adicionar tarefa **/
app.post("/tarefa", cors(), (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});


/** Alterar estado **/
app.put("/estado/:index", cors(), (request, response) => {
    collection.updateOne(request.body, {$set: {"estado": request.params.index}}, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});


/** Apagar dado **/
app.delete("/tarefa/:nome", cors(), (request, response) => {
    collection.deleteOne({"nome": request.params.nome}, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});