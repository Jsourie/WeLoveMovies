
exports.up = function (knex) {
    return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary(); // Sets supplier_id as the primary key
      table.string("preferred_name");
      table.string("surname");
      table.string("organization_name");
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  }
console.log("return succeeded")
  exports.down = function (knex) {
    return knex.schema.dropTable("critics");
  };

  console.log("tabledropsucceded")