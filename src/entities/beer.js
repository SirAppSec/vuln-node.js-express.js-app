'use strict';
/**
 * A Beer type
 * @typedef {object} Beer
 * @property {string} name.required - Name of the beer
 * @property {number} price.required - The price
 * @property {string} picture - The picture id

 */
module.exports = (sequalize, DataTypes) =>{
    const Beer = sequalize.define('beer',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type:DataTypes.FLOAT,
            allowNull: false
        },
        currency: {
            type: DataTypes.ENUM('USD', 'ILS', 'EUR'),
            allowNull: true
          },
        stock: {
            type: DataTypes.ENUM('plenty', 'little', 'out'),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequalize.fn('NOW'),
            allowNull: false
          },
          updated_at: DataTypes.DATE,
          deleted_at: DataTypes.DATE,
        }, {
          paranoid: true,
          underscored: true
        });
        
    return Beer;
};