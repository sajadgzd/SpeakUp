module.exports = function(sequelize, DataTypes) {
    var Crime = sequelize.define("Crime", {
        type: DataTypes.STRING,
        location: DataTypes.STRING,
        date: DataTypes.DATE,
        reported: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,

    });
    return Crime;
};