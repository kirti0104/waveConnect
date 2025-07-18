import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

class Comments extends Model{
   public id!: number;
   public comment!:string;
   public waveId!: number;
   public status!: string;
   public createdAt!: Date;
   public updatedAt!: Date;
   public deletedAt!: Date | null;
}

Comments.init({
   
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
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
    waveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "waves",
        key: "id",
      },
    },

},{
    sequelize,tableName:'comments'
})


export default Comments;