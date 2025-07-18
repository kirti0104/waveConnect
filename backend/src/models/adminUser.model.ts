import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class AdminUser extends Model {
  public id!: number; 
  public email!: string; 
  public password!: string;
  public fullName!: string; 
  public status!: string;  // Added status field
  public isDeleted!: boolean;  // Added isDeleted field
  public createdAt!: Date;  // Sequelize automatically manages createdAt
  public updatedAt!: Date;  // Sequelize automatically manages updatedAt
  public deletedAt!: Date | null;  // Sequelize will handle soft deletion (null or timestamp)
}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Make sure email is unique
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Set default to 'active'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false, meaning the user is not deleted
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set creation timestamp
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set update timestamp
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // By default, set deletedAt to null
    },
  },
  {
    sequelize,
    tableName: 'adminuser',
    paranoid: true, // Enable soft delete (sets deletedAt to a timestamp on deletion)
    timestamps: true, // Enable automatic management of createdAt and updatedAt
  }
);

export default AdminUser;
