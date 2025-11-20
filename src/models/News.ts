import { DataTypes, Model, Optional, Sequelize } from "sequelize"

// News model attributes
export interface NewsAttributes {
  id: number
  title: string
  category: string
  image: string
  content: string | null
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// Optional fields for creation
interface NewsCreationAttributes
  extends Optional<
    NewsAttributes,
    "id" | "content" | "publishedAt" | "createdAt" | "updatedAt"
  > {}

// News model class
export class News
  extends Model<NewsAttributes, NewsCreationAttributes>
  implements NewsAttributes
{
  public id!: number
  public title!: string
  public category!: string
  public image!: string
  public content!: string | null
  public publishedAt!: Date | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize function to be called with sequelize instance
export const initNews = (sequelize: Sequelize) => {
  News.init(
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      publishedAt: {
        type: DataTypes.DATE,
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
      tableName: "News",
      timestamps: true,
    },
  )
  return News
}

