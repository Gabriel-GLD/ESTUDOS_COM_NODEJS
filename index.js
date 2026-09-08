const express = require("express");
const server = express()

server.use(express.json());

let customers = [
    { id: 1, name: "Gabriel Lucas", site: "http://gabri.com.br"},
    { id: 2, name: "Google", site: "http://google.com"},
    { id: 3, name: "UOL", site: "http://yol.com.br"},
    { id: 4, name: "Postman", site: "http://postman.com"}
];

server.get("/customers", (req, res) => {
    return res.json(customers);
});


// SHOW
server.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id === id);
    const status = customer ? 200 : 404;

    console.log("GET :: /customer/:id ", json.stringify)

    return  res.status(status).json(customer);
});


server.post("/customers", (req, res) => {
    const { name, site} = req.body; 
    const id = customers[customers.lenght - 1].id + 1;

    const newCustomer = { id, name, site };
    customer.push(newCustomer);

    return res.status(201).json(newCustomer);
});

server.put("/customers/: id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers. findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404;

    if (index >=0) {
        customers[index] = { id: parseInt(id), name, site } 
    }

    return req.status(status).json(customer[index]);
});

server.delete ("/curtomer/: id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
        customers.splice(index, 1);
    }

    return res.status(status).json();
});

server.listen(3000);

