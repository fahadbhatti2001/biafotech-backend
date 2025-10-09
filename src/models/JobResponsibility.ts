import { DataTypes, Model, Optional, Sequelize } from "sequelize"

// JobResponsibility model attributes
export interface JobResponsibilityAttributes {
  id: number
  title: string
  points: string[]
  jobId: number
  order: number
}

// Optional fields for creation
interface JobResponsibilityCreationAttributes extends Optional<JobResponsibilityAttributes, "id" | "order"> {}

// JobResponsibility model class
export class JobResponsibility extends Model<JobResponsibilityAttributes, JobResponsibilityCreationAttributes> implements JobResponsibilityAttributes {
  public id!: number
  public title!: string
  public points!: string[]
  public jobId!: number
  public order!: number
}

// Initialize function to be called with sequelize instance
export const initJobResponsibility = (sequelize: Sequelize) => {
  JobResponsibility.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Job",
          key: "id",
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "JobResponsibility",
      timestamps: false,
      indexes: [
        {
          fields: ["jobId"],
        },
      ],
    },
  )
  return JobResponsibility
}

