import { DataTypes, Model, Optional, Sequelize } from "sequelize"

// Portfolio model attributes
export interface PortfolioAttributes {
  id: number
  title: string
  client: string
  category: string
  description: string
  image: string
  technologies: string[]
  projectUrl: string | null
  createdAt: Date
  updatedAt: Date
}

// Optional fields for creation
interface PortfolioCreationAttributes
  extends Optional<
    PortfolioAttributes,
    "id" | "projectUrl" | "createdAt" | "updatedAt"
  > {}

// Portfolio model class
export class Portfolio
  extends Model<PortfolioAttributes, PortfolioCreationAttributes>
  implements PortfolioAttributes
{
  public id!: number
  public title!: string
  public client!: string
  public category!: string
  public description!: string
  public image!: string
  public technologies!: string[]
  public projectUrl!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize function to be called with sequelize instance
export const initPortfolio = (sequelize: Sequelize) => {
  Portfolio.init(
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
      client: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      technologies: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      projectUrl: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "Portfolio",
      timestamps: true,
    },
  )
  return Portfolio
}

