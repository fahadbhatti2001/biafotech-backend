'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if admin user already exists
    const [existingUser] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'admin@biafotech.com' LIMIT 1;`
    );

    if (existingUser && existingUser.length > 0) {
      console.log('Admin user already exists, skipping seed...');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('12345678', 10);

    // Insert the admin user
    await queryInterface.bulkInsert('User', [
      {
        email: 'admin@biafotech.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    console.log('Admin user created successfully!');
  },

  async down(queryInterface, Sequelize) {
    // Remove the admin user
    await queryInterface.bulkDelete('User', {
      email: 'admin@biafotech.com'
    }, {});
  }
};

