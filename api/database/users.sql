
-- User
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE, 
  password TEXT,
  roleId INTEGER
);


-- Role
CREATE TABLE role (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);

INSERT INTO role (name) VALUES 
  ("admin"),
  ("staff"),
  ("panelist");


-- Cat!
CREATE TABLE IF NOT EXISTS cat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, 
  isFluffy BOOLEAN
);

INSERT INTO cat (name, isFluffy) VALUES 
  ("Wilbur", FALSE), 
  ("Fern", FALSE);
