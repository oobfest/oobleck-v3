CREATE TABLE host (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,
  personId INTEGER,
  
  -- One to One: a host is a person!
  FOREIGN KEY(personId) REFERENCES person(id)
);
