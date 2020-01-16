CREATE TABLE review (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  userId INTEGER,
  FOREIGN KEY(userId) REFERENCES user(id),
  FOREIGN KEY(actId) REFERENCES act(id),
  score INTEGER,
  notes TEXT
);
