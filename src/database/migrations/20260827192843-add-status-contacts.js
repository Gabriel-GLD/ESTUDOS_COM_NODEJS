module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("contacts", "status", {
            type: Sequelize.ENUm("ACTIVE", "ARCHIVED"),
            default: false,
            allowNull: "ACTIVE",
        });
    },

    down: (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("contacts", "status", {
                transaction,
            });
            await queryInterface.sequelize.query(
                "DROP TYPE enum_contacts_status",
                {
                    transaction,
                },
            );
        });
    },
};

