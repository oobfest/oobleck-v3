CREATE TABLE performer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  bio TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  imageUrl TEXT,
  imageDeleteUrl TEXT
);
