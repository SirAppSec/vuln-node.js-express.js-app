'use strict';

module.exprots = (sequalize, DataTypes) =>{
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
        price: {
            type:DataTypes.FLOAT,
            allowNull: false
        }
    })
};