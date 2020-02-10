CREATE TABLE show (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,
  dayId INTEGER,
  stageId INTEGER,

  timestamp INTEGER,
  duration INTEGER,

  -- For e.g. standup showcases
  name TEXT,
  imageUrl TEXT,
  imageDeleteUrl TEXT,
  
  -- One to Many: Day to Show
  -- Ex. There are many shows on Wednesday! 
  FOREIGN KEY(dayId) REFERENCES day(id),
 
  -- One to Many: Stage to Show
  -- Ex. There are many shows at Hideout Downstairs
  FOREIGN KEY(stageId) REFERENCES stage(id)
);
