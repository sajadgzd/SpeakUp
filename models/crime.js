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
    return Crime;
};