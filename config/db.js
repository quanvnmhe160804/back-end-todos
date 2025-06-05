require('dotenv').config()
const knex = require('knex') ({
    client: 'mysql2',
     debug: true,
    // connection: {
    //     host: '104.161.49.14',
    //     port: 28138,
    //     user: 'levtest',
    //     password: 'Levcloud2025@@',
    //     database: 'Lev_test_db'
    // }
    connection:{
        host:process.env.host,
        port:process.env.port,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }

 
})
async function setupAndQuery() {
    try {
      await knex.raw('SELECT 1');
      console.log('Connected to database');
      const hasTable = await knex.schema.hasTable('todos');
      if (!hasTable) {
        await knex.schema.createTable('todos', (table) => {
          table.increments('id').primary();
          table.string('title', 255);
          table.text('description');
          table.date('due_date');
          table.boolean('is_completed').defaultTo(false);
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
        console.log('Table `todos` created');
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }
  
  setupAndQuery();
module.exports = knex
