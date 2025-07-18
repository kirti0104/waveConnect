import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class AuditLog extends Model {
    public id!: string; 
    public action!: string; 
    public userId!: string | null; 
    public description!: string; 
    public timestamp!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    userId: {
      type: DataTypes.UUID, 
      allowNull: true,
     
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
     
    },
  },
  {
    sequelize,
    tableName: 'auditlogs',
  }
);

export default AuditLog;
