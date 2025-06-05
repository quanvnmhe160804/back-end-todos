const db = require('../config/db');
const todoModel = require('../models/todos');
const table = todoModel.getTableName()
const fields = todoModel.getFieldMapping()

function getAll(filter = {}) {
  const query = db(table).select(
    fields.ID,
    fields.Title,
    fields.Description,
    fields.Due_date,
    fields.Is_completed,
    fields.Created_at
  );

  if (filter.is_completed !== undefined) {
    query.where(fields.Is_completed, filter.is_completed);
  }
  return query;
}


async function create(data) {
  const [id] = await db(table).insert({
    [fields.Title]: data.title,
    [fields.Description]: data.description,
    [fields.Due_date]: data.due_date,
    [fields.Created_at]: data.created_at,
    [fields.Updated_at]: data.updated_at
  });
  return await db(table).where({ [fields.ID]: id }).first();
}


async function update(id, data) {
  await db(table).where({ [fields.ID]: id }).update({
    [fields.Title]: data.title,
    [fields.Description]: data.description,
    [fields.Is_completed]:data.is_completed,
    [fields.Due_date]: data.due_date,
    [fields.Updated_at]: data.updated_at
  });
  return await db(table).where({ [fields.ID]: id }).first();
}


function remove(id) {
  return db(table).where({ [fields.ID]: id }).del();
}


module.exports = {
  getAll,
  create,
  update,
  remove,
};
