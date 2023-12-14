'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "username" });
    }
  }
  Balance.init({
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "balance is required!",
        },
        min: {
          args: [0],
          msg: "balance must be more than 0",
        },
      },
    },
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};