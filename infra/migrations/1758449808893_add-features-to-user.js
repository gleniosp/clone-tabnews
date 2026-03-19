exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNull: true,
      default: "{}", // an empty array on PostgreSQL
    },
  });
};

exports.down = false;
