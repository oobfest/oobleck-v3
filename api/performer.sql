CREATE TABLE performer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT,
  bio TEXT,
  affiliation TEXT,

  -- Contact
  email TEXT,
  phone TEXT,

  -- Image
  imageUrl TEXT,
  imageDeleteUrl TEXT,

);
