// Base class to build the table classes upon
class BaseEntity {
  // Construcotr for the database connection
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // Method to query database to find all
  findAll(query) {
    return this.dbConnection.query(query);
  }

  // Method to query database to find by id
  findById(query, id) {
    return this.dbConnection.query(query, id);
  }

  // Method to query database to insert data
  insert(table, obj) {
    return this.dbConnection.query(`INSERT INTO ?? (??) VALUES (?)`, [
      table,
      Object.keys(obj),
      Object.values(obj),
    ]);
  }

  // Method to query database to update data
  updateById(table, obj, id) {
    return this.dbConnection.query(`UPDATE ?? SET ? WHERE id = ?`, [table, obj, id]);
  }

  // Method to query database to delete using an id
  deleteById(table, id) {
    return this.dbConnection.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
  }
}

// Exports the class
module.exports = BaseEntity;
