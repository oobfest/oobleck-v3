CREATE TABLE review (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  userId INTEGER,

  score INTEGER,
  notes TEXT,

  -- One to Many: A user has many reviews
  FOREIGN KEY(userId) REFERENCES user(id)
  
  -- One to Many: An act has many reviews
  FOREIGN KEY(actId) REFERENCES act(id)
);
