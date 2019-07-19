module.exports = function(sequelize, DataTypes) {
    var hateCrime = sequelize.define("hateCrime", {
        type: DataTypes.STRING,
        borough: DataTypes.STRING,
        location: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
        date: DataTypes.INTEGER,
        reported: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,
    });
    return hateCrime;
};