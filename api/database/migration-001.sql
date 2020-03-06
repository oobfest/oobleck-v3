-- Add "unique" constraint to review table


-- Turn off foreign key constraint
PRAGMA foreign_keys=OFF;

-- Create updated version of the review table
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

-- Copy old table to new table
INSERT INTO new_review
SELECT * FROM review;

-- Drop old table
DROP TABLE review;

-- Rename new table to old table name
ALTER TABLE new_review
RENAME TO review;

-- Turn foreign key constraint back on
PRAGMA foreign_keys=ON;
