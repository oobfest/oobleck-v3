-- DateTime:
-- https://www.sqlitetutorial.net/sqlite-date/

CREATE TABLE day (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  timestamp INTEGER
);

INSERT INTO day (name, timestamp) VALUES 
  ("Tuesday",   1598943600000),
  ("Wednesday", 1599030000000),
  ("Thursday",  1599116400000),
  ("Friday",    1599202800000),
  ("Saturday",  1599289200000),
  ("Sunday",    1599375600000),
  ("Monday",    1599462000000);

CREATE TABLE venue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

INSERT INTO venue (name) VALUES
  ("ColdTowne Theater"),
  ("Fallout Theater"),
  ("Hideout Theatre");

-- Also includes "Hideout Classroom"
CREATE TABLE stage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  venueId INTEGER,
  FOREIGN KEY(venueId) REFERENCES venue(id)
);

INSERT INTO stage (name, venueId) VALUES
  ("ColdTowne", 1),
  ("Fallout", 2),
  ("Hideout Upstairs", 3),
  ("Hideout Downstairs", 3);

-- Account for standup showcases!!
CREATE TABLE show (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER,
  duration INTEGER,
  dayId INTEGER,
  stageId INTEGER,

  -- optional
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


CREATE TABLE day_to_stage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dayId INTEGER,
  stageId INTEGER,
  FOREIGN KEY(dayId) REFERENCES day(id),
  FOREIGN KEY(stageId) REFERENCES stage(id)
);

CREATE TABLE stage_to_venue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stageId INTEGER,
  venueId INTEGER,
  FOREIGN KEY(stageId) REFERENCES stage(id),
  FOREIGN KEY(venueId) REFERENCES venue(id)
);


