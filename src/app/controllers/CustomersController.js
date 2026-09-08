import Customer from "../models/Customer";

let customers = [
    { id: 1, name: "Gabriel Lucas", site: "http://gabri.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://yol.com.br" },
];
class CustomersController {
    // Listagem dos Customers
    async index (req, res) {

        const {
            name,
            email,
            status,
            createdBefore,
            updatedBefore,
            updateAfter,
            sort.
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        // localhost:3000/customers/?page2&limit=25
        // 250 registros (10 paginas)
        // pg (25 - 50)

        let where = {}

        if(name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            }
        }

        if(email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            }
        }


        //[Op.in]: ["ACTIVE, "ARCHIVED"],
        //localhost: 3000/customers?status=active,archived
        // status = active,archived => ["active, archived"]


        if(status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                },
            }
        }

        if(createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: createdBefore,
                },
            }
        }


        const data = await Customer.findAll({
            limite: 1000
        });

        return res.json(data);
    };

    // Recupera um Customer
    show(req, res) {
        const id = parseInt(req.params.id, 10);
        const customer = customers.find((item) => item.id === id);
        const status = customer ? 200 : 404;
    }

    // Cria um novo Customer
    create(req, res) {
        const { name, site } = req.body;
        const id = customers[customers.lenght - 1].id + 1;

        const newCustomer = { id, name, site };
        customer.push(newCustomer);

        return res.status(201).json(newCustomer);
    }

    // Atualiza um Customer
    update(req, res) {
        const id = parseInt(req.params.id, 10);
        const { name, site } = req.body;

        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers[index] = { id: parseInt(id, 10), name, site };
        }

        return req.status(status).json(customer[index]);
    }

    // Exclui um Customer
    destroy(req, res) {
        const id = parseInt(req.params.id, 10);
        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers.splice(index, 1);
        }

        return res.status(status).json();
    }
}

export default new CustomersController();
