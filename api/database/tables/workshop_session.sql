CREATE TABLE workshop_session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,
  workshopId INTEGER,
  dayId INTEGER,
  stageId INTEGER,
  
  timestamp INTEGER,

  -- One to Many: Workshop to Workshop Session
  -- A workshop can have multiple sessions
  FOREIGN KEY(workshopId) REFERENCES workshop(id)
  
  -- One to Many: Days to Workshop Sessions 
  -- Sunday can have many workshop sessions
  FOREIGN KEY(dayId) REFERENCES day(id)
  
  -- One to Many: Stage to Workshop Sessions
  -- Hideout Downstairs can have many workshop sessions
  FOREIGN KEY(stageId) REFERENCES stage(id)
);
