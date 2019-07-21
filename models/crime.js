module.exports = function(sequelize, DataTypes) {
    var Crime = sequelize.define("Crime", {
        type: DataTypes.STRING,
        borough: DataTypes.STRING,
        location: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
        date: DataTypes.INTEGER,
        reported: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,
    });

    Crime.associate = function(models) {
        // We're saying that a Crime should belong to a User
        // A Crime can be created without a User, we allow anonymous crime reporting
        Crime.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };


    return Crime;
};