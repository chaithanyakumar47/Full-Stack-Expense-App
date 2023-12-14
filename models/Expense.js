const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const User = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = User;