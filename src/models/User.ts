import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export enum UserRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

// User model attributes
export interface UserAttributes {
  id: number
  email: string
  password: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Optional fields for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role" | "isActive" | "createdAt" | "updatedAt"> {}

// User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public role!: UserRole
  public isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Initialize function to be called with sequelize instance
export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.ADMIN,
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
      tableName: "User",
      timestamps: true,
    },
  )
  return User
}

