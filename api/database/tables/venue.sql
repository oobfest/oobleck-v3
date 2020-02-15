CREATE TABLE venue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,

  name TEXT,
  description TEXT,
  address TEXT,
  url TEXT
);
