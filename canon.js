const path = require("path");

/**
 * This object is used to set configurations for canon and its sub-modules.
 * @type {import("@datawheel/canon-core").Config}
 */
module.exports = {
  // Check the documentation on how to enable databases
  db: [],

  // Path to the file with the environment variables needed to run the process
  env: path.resolve(__dirname, ".env")
};
