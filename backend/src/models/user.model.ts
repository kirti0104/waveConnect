import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Preferences from "../models/preferences.model"
import Waves from "./waves.model";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public password!: string;
  public addressOne!: string;
  public addressTwo!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public socialSecurityNumber!: string;
  public dob!: string;
  public gender!: "male" | "female" | "other";
  public martialStatus!: "single" | "married" | "divorced" | "widowed";
  public social!: string;
  public kids!: string;
  public status!: string;
  public userProfile!:string
  public isDeleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressOne: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    socialSecurityNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },
    martialStatus: {
      type: DataTypes.ENUM("single", "married", "divorced", "widowed"),
      allowNull: true,
    },
    social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kids: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
      userProfile: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: "user",
    paranoid: true,
    timestamps: true,
  }
);


User.hasOne(Preferences, { foreignKey: "userId" });
Preferences.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Waves,{foreignKey:"userId"});
Waves.belongsTo(User,{foreignKey:"userId"});

export default User;
