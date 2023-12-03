exports.up = function (knex) {
    return knex.schema.table("movies_theaters", (table) => {
        table.boolean("is_showing").notNullable().defaultTo(true);
    });
  };

  exports.down = function (knex) {
    return knex.schema.table("movies_theaters", (table) => {
      table.dropColumn("is_showing");
    });
  };
