'use strict';

/**
 * A User type
 * @typedef {object} User
 * @property {string} name - Name of the user
 * @property {string} email.required - The email of the username
 * @property {string} password.required - User Password -> encrypt to md5 
 * @property {string} role - User Role default admin (admin,user,blocked)
 * @property {string} address - User Address
 * @property {string} profile_pic - User profile pic

 */
module.exports = (sequalize, DataTypes) =>{
    const User = sequalize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'blocked'),
            allowNull: true,
            defaultValue: 'user'
          },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
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

        
    return User;
};