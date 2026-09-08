
module.exports = {
    up: (queryInterface) => {
        queryInterface.removeColumn("users", provider);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users", "provider", {
            type: Sequelize.BOOLEAN,
            default: false,
            allowNull: false,
        });
    },
};
