module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    googleID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileIMG: {
      type: DataTypes.STRING,
      // allowNull: false,
      // defaultValue: ''
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Image, {
      onDelete: "cascade",
    });
  };

  return User;
};