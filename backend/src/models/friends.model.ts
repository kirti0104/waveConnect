import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Friends extends Model{
   public id!: number;
  public senderId!: number;
  public receiverFullName!:string;
  public receiverEmail!: string;
  public message!:string;
  public status!: 'pending' | 'accepted';
   public isDeleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

Friends.init({
   
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverFullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message:{
      type:DataTypes.STRING,
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted'),
      defaultValue: 'pending',
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
    sequelize,tableName:'friends'
})

export default Friends;