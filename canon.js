const path = require("path");

/**
 * This object is used to set configurations for canon and its sub-modules.
 * @type {import("@datawheel/canon-core").Config}
 */
module.exports = {
  db: [{
    connection: process.env.CANON_DB_CONNECTION_STRING,
    tables: [
      require("@datawheel/canon-core/models"),
      require("@datawheel/canon-cms/models")
    ],
    sequelizeOptions: {
      // dialect: "sqlite",
      // storage: path.join(__dirname, "db.sqlite")
    }
  }],

  // Path to the file with the environment variables needed to run the process
  env: path.resolve(__dirname, ".env")
};
