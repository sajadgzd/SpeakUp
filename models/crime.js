module.exports = function(sequelize, DataTypes) {
    var SexAssualtCrime = sequelize.define("SexAssualtCrime", {
        type: DataTypes.STRING,
        borough: DataTypes.STRING,
        location: DataTypes.STRING,
        date: DataTypes.DATE,
        reported: DataTypes.BOOLEAN,
        description: DataTypes.TEXT,
    });
    return SexAssualtCrime;
};