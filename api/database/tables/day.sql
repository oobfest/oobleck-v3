CREATE TABLE day (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,
  
  name TEXT,
  timestamp INTEGER
);
