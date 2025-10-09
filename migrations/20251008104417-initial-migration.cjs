'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create User table
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('ADMIN', 'SUPER_ADMIN'),
        allowNull: false,
        defaultValue: 'ADMIN',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Job table
    await queryInterface.createTable('Job', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dateOpened: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      jobType: {
        type: Sequelize.ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'),
        allowNull: false,
        defaultValue: 'FULL_TIME',
      },
      workExperience: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requirements: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      qualifications: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create JobResponsibility table
    await queryInterface.createTable('JobResponsibility', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      points: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Job',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });

    // Add index for jobId in JobResponsibility
    await queryInterface.addIndex('JobResponsibility', ['jobId']);

    // Create JobApplication table
    await queryInterface.createTable('JobApplication', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Job',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      applicantName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      applicantEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resumeUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      coverLetter: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'REVIEWED', 'INTERVIEW', 'REJECTED', 'HIRED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes for JobApplication
    await queryInterface.addIndex('JobApplication', ['jobId']);
    await queryInterface.addIndex('JobApplication', ['status']);
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order due to foreign key constraints
    await queryInterface.dropTable('JobApplication');
    await queryInterface.dropTable('JobResponsibility');
    await queryInterface.dropTable('Job');
    await queryInterface.dropTable('User');
  }
};