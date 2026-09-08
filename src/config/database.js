module.exports = {
    dialect: "postgress",
    host: "localhost",
    username: "postgres",
    password: "secret",
    database: "teste-dominando-nodejs",
    define: {
        timestamp: true, //cria duas colunas: createdAt updateAt
        underscored: true, //nomeclatura _ (nao camelCase) customersGroup => "customersGroup" vira "customers_group"
        undescoredAll: true,
    },
};
