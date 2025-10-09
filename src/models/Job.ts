import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
}

// Job model attributes
export interface JobAttributes {
  id: number
  title: string
  description: string
  salary: string | null
  dateOpened: Date
  jobType: JobType
  workExperience: string
  city: string
  state: string
  country: string
  zipCode: string | null
  requirements: string[]
  qualifications: string[]
  createdBy: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Optional fields for creation
interface JobCreationAttributes extends Optional<JobAttributes, "id" | "salary" | "dateOpened" | "jobType" | "workExperience" | "city" | "state" | "country" | "zipCode" | "isActive" | "createdAt" | "updatedAt"> {}

// Job model class
export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number
  public title!: string
  public description!: string
  public salary!: string | null
  public dateOpened!: Date
  public jobType!: JobType
  public workExperience!: string
  public city!: string
  public state!: string
  public country!: string
  public zipCode!: string | null
  public requirements!: string[]
  public qualifications!: string[]
  public createdBy!: number
  public isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize function to be called with sequelize instance
export const initJob = (sequelize: Sequelize) => {
  Job.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOpened: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      jobType: {
        type: DataTypes.ENUM(...Object.values(JobType)),
        allowNull: false,
        defaultValue: JobType.FULL_TIME,
      },
      workExperience: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requirements: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      qualifications: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "Job",
      timestamps: true,
    },
  )
  return Job
}

