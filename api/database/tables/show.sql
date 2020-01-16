CREATE TABLE show (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER,
  duration INTEGER,

  -- For e.g. standup showcases
  name TEXT,
  imageUrl TEXT,
  imageDeleteUrl TEXT,

  dayId INTEGER,
  stageId INTEGER,

  FOREIGN KEY(dayId) REFERENCES day(id),
  FOREIGN KEY(stageId) REFERENCES stage(id)
);


CREATE TABLE slot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  duration INTEGER,

  showId INTEGER,
  actId INTEGER,
  FOREIGN KEY(showId) REFERENCES show(id)
  FOREIGN KEY(actId) REFERENCES act(id)
);
