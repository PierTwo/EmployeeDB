const chalk = require("chalk");

class BaseEntity {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  findAll(query) {
    return this.dbConnection.query(query);
  }

  findById(query, id) {
    return this.dbConnection.query(query, id);
  }

  insert(table, obj) {
    return this.dbConnection.query(`INSERT INTO ?? (??) VALUES (?)`, [
      table,
      Object.keys(obj),
      Object.values(obj),
    ]);
  }

  updateById(table, obj, id) {
    return this.dbConnection.query(`UPDATE ?? SET ? WHERE id = ?`, [
      table,
      obj,
      id,
    ]);
  }

  deleteById(table, id) {
    return this.dbConnection.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
  }
}

module.exports = BaseEntity;
