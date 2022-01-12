const connection = require('./dbconfig');
const Sequelize = require('sequelize');
const Category = require('./Category');

const Product = connection.define('products',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//setting one to many relation
Category.hasMany(Product);
Product.belongsTo(Category);

//Run once and it's synced already
// Product.sync({force: true}).then(()=>{
//     console.log('Success');
// }).catch(err=>{
//     console.log(err);
// });

module.exports = Product;