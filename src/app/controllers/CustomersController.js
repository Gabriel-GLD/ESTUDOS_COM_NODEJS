import { ConnectionAcquireTimeoutError } from "sequelize";
import Customer from "../models/Customer";
import { parseISO } from "date-fns";
import Contact from "../models/Contact"

let customers = [
    { id: 1, name: "Gabriel Lucas", site: "http://gabri.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://yol.com.br" },
];
class CustomersController {
    // Listagem dos Customers
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        // localhost:3000/customers/?page2&limit=25
        // 250 registros (10 paginas)
        // pg (25 - 50)

        let where = {};
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        //[Op.in]: ["ACTIVE, "ARCHIVED"],
        //localhost: 3000/customers?status=active,archived
        // status = active,archived => ["active, archived"]

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status
                        .split(",")
                        .map((item) => item.toUpperCase()),
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        // localhost:3000?sort=id:desc,name
        if(sort) {
            order = sort.split(",").map(item => item.split(":"))
        }


        const data = await Customer.findAll({
            where,
            // include: [
            //     {
            //         model: Contact,
            //         attributes: ["id, "status"],
            //     }
            // ]
            order,
            limit,
            offset: limit * page - limit,   //25 * 10 - 25
        });

        return res.json(data);
    }

    // Recupera um Customer
    async show(req, res) {

        const customer = await Customer.findByPk(req.params.id)

        if(!customer) {
            return res.status(404).json({error: "Resource not found"})
        }

        return  res.json(customer)
    }

    // Cria um novo Customer
    async create(req, res) {
        // req.body
        const customer = await Customer.create(req.body);

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
