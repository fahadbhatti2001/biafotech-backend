const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function updateEmail() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Update the email
    const [result] = await sequelize.query(
      'UPDATE "User" SET email = $1 WHERE email = $2 RETURNING *',
      { bind: ['admin@biafotech.com', 'admin@biafotech'] }
    );
    
    if (result.length > 0) {
      console.log('✅ Email updated successfully!');
      console.log('  New email: admin@biafotech.com');
      console.log('  Password remains: 12345678');
    } else {
      console.log('⚠️  No user found with email admin@biafotech');
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateEmail();

