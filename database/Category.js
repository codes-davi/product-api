const connection = require('./dbconfig');
const Sequelize = require('sequelize');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

//Run once and it's synced already
// Category.sync({force: true}).then(()=>{
//     console.log('Success');
// }).catch(err=>{
//     console.log(err);
// });

module.exports = Category;