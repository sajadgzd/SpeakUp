module.exports = function(sequelize, DataTypes) {
    var hateCrime = sequelize.define("hateCrime", {
        type: DataTypes.STRING,
        borough: DataTypes.STRING,
        location: DataTypes.STRING,
        date: DataTypes.INTEGER,
        reported: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,
    });
    return hateCrime;
};