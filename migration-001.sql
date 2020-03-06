PRAGMA foreign_keys=OFF;

CREATE TABLE new_review (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  userId INTEGER,

  score INTEGER,
  notes TEXT,

  -- One to Many: A user has many reviews
  FOREIGN KEY(userId) REFERENCES user(id)
  
  -- One to Many: An act has many reviews
  FOREIGN KEY(actId) REFERENCES act(id)

  -- Only one review for each act per user
  UNIQUE(actId, userId)
);

INSERT INTO new_review
SELECT * FROM review;

DROP TABLE review;

ALTER TABLE new_review
RENAME TO review;

