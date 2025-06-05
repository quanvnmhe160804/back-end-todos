// const db = require('../config/db');

// function getTodos() {
//     return db.table('todos').select('*')
// }

// module.exports = {
//     getTodos
// }

const Todo={
    table: 'todos',
    fields: {
        ID: 'id',
        Title: 'title',
        Description: 'description',
        Due_date: 'due_date',
        Is_completed: 'is_completed',
        Created_at: 'created_at',
        Updated_at:'updated_at'
      },
      getTableName() {
        return this.table;
      },
    
      getFieldMapping() {
        return this.fields;
      }
}
module.exports = Todo;