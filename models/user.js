'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Balance, { foreignKey: "userId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "username is required!",
        },
        notEmpty: {
          msg: "username is required!",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  // Custom validation for unique username
  User.addHook('beforeValidate', async (user, options) => {
    const existingUser = await User.findOne({
      where: { username: user.username },
    });

    if (existingUser && user.id !== existingUser.id) {
      throw { name: 'Username already in use!' }
    }
  });
  return User;
};