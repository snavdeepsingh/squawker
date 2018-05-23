module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Image;
};
