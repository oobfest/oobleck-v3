CREATE TABLE act (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,

  name TEXT,
  slug TEXT,
  creationDate INTEGER,
  showTitle TEXT,
  country TEXT,
  stateOrProvince TEXT,
  city TEXT,
  associatedTheater TEXT,
  isHeadliner BOOLEAN,

  publicDescription TEXT,
  privateDescription TEXT,
  accolades TEXT,

  imageUrl TEXT,
  imageDeleteUrl TEXT,

  videoUrl1 TEXT,
  videoUrl2 TEXT,
  videoInformation TEXT,

  techNeeds TEXT,
  minimumTime INTEGER,
  maximumTime INTEGER,

  contactName TEXT,
  contactPhone TEXT,
  contactEmail TEXT,
  contactRoleId TEXT,

  isLocal BOOLEAN,
  isPaid BOOLEAN,
  isAccepted BOOLEAN,
  isConfirmed BOOLEAN
);

-- Acts to Days
-- Many acts are available on many days
CREATE TABLE act_availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  dayId INTEGER,
  
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(dayId) REFERENCES day(id)
);

-- Many acts have many act types
-- Ex. Rook is both improv and musical
CREATE TABLE act_to_act_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  actTypeId INTEGER,
  
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(actTypeId) REFERENCES act_type(id)
);

-- Many acts have many people
-- Ex. Beltran is in both Migas and Dixon
-- Joplin is in both Migas and Knuckleball Now
CREATE TABLE act_to_person (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  personId INTEGER,
  actRoleId INTEGER,
  
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(personId) REFERENCES person(id),
  FOREIGN KEY(actRoleId) REFERENCES act_role(id)
);
