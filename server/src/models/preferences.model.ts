import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Preferences extends Model {
  public id!: number;
  public language!: string;
  public breakfast!: string;
  public lunch!: string;
  public dinner!: string;
  public wakeTime!: string;
  public bedTime!: string;
  public weight!: string;
  public height!: string;
  public bloodGlucose!: string;
  public cholesterol!: string;
  public bloodPressure!: string;
  public distance!: string;
  public communicationType!: string[];
  public userId!: number; // Foreign key to link to User
}

Preferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breakfast: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lunch: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    dinner: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    wakeTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    bedTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodGlucose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cholesterol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    communicationType: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "preferences",
  }
);

export default Preferences;
