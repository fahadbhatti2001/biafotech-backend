const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function cleanup() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Delete old user
    await sequelize.query(
      'DELETE FROM "User" WHERE email = $1',
      { bind: ['admin@biafotech'] }
    );
    
    console.log('✅ Deleted old user: admin@biafotech');
    console.log('\n📧 Login with:');
    console.log('  Email: admin@biafotech.com');
    console.log('  Password: 12345678');
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanup();

