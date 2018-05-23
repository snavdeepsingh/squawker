module.exports = function(sequelize, DataTypes) {
var BirdNameMaster = sequelize.define("BirdNameMaster", {
    BirdName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },{
    timestamps: false,
    });
return BirdNameMaster;
}