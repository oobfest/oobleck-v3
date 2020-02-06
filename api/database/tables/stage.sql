CREATE TABLE stage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,

  name TEXT,
  venueId INTEGER,
  FOREIGN KEY(venueId) REFERENCES venue(id)
);

-- One to Many: A venue has many stages
-- Ex. The Hideout has Upstairs, Downstairs & Classroom
CREATE TABLE stage_to_venue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stageId INTEGER,
  venueId INTEGER,
  FOREIGN KEY(stageId) REFERENCES stage(id),
  FOREIGN KEY(venueId) REFERENCES venue(id)
);
