CREATE TABLE show (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER,
  duration INTEGER,
  dayId INTEGER,
  stageId INTEGER,

  -- For standup showcases
  name TEXT,
  imageUrl TEXT,

  FOREIGN KEY(dayId) REFERENCES day(id),
  FOREIGN KEY(stageId) REFERENCES stage(id)
);

CREATE TABLE slot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  duration INTEGER,
  showId INTEGER
);
