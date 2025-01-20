import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

class Waves extends Model{
   public id!: number;
   public name!:string;
    public photoUrl!: string;
    public message!:string;
   public isActive!: boolean;
   public userId!: number;
   public status!: string;
   public isDeleted!: boolean;
   public createdAt!: Date;
   public updatedAt!: Date;
   public deletedAt!: Date | null;
}

Waves.init({
   
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
     photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
   status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
     isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

},{
    sequelize,tableName:'waves'
})


export default Waves;