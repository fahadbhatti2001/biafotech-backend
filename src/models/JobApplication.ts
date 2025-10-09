import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export enum ApplicationStatus {
  PENDING = "PENDING",
  REVIEWED = "REVIEWED",
  INTERVIEW = "INTERVIEW",
  REJECTED = "REJECTED",
  HIRED = "HIRED",
}

// JobApplication model attributes
export interface JobApplicationAttributes {
  id: number
  jobId: number
  applicantName: string
  applicantEmail: string
  resumeUrl: string | null
  coverLetter: string | null
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
}

// Optional fields for creation
interface JobApplicationCreationAttributes extends Optional<JobApplicationAttributes, "id" | "resumeUrl" | "coverLetter" | "status" | "createdAt" | "updatedAt"> {}

// JobApplication model class
export class JobApplication extends Model<JobApplicationAttributes, JobApplicationCreationAttributes> implements JobApplicationAttributes {
  public id!: number
  public jobId!: number
  public applicantName!: string
  public applicantEmail!: string
  public resumeUrl!: string | null
  public coverLetter!: string | null
  public status!: ApplicationStatus
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize function to be called with sequelize instance
export const initJobApplication = (sequelize: Sequelize) => {
  JobApplication.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Job",
          key: "id",
        },
      },
      applicantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicantEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverLetter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(ApplicationStatus)),
        allowNull: false,
        defaultValue: ApplicationStatus.PENDING,
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
      tableName: "JobApplication",
      timestamps: true,
      indexes: [
        {
          fields: ["jobId"],
        },
        {
          fields: ["status"],
        },
      ],
    },
  )
  return JobApplication
}

