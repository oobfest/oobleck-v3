CREATE TABLE act (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creationDate INTEGER,

  name TEXT,
  slug TEXT,
  showTitle TEXT,
  country TEXT,
  stateOrProvince TEXT,
  city TEXT,
  associatedTheater TEXT,
  isHeadliner BOOLEAN,
  isHidden BOOLEAN DEFAULT FALSE,

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

CREATE TABLE act_to_social_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  socialMediaId INTEGER,
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(socialMediaId) REFERENCES social_media(id)
);

CREATE TABLE act_availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  dayId INTEGER,
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(dayId) REFERENCES day(id)
);

CREATE TABLE act_to_act_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  actTypeId INTEGER,
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(actTypeId) REFERENCES act_type(id)
);

CREATE TABLE act_to_person (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  personId INTEGER,
  actRoleId INTEGER,
  FOREIGN KEY(actId) REFERENCES act(id),
  FOREIGN KEY(personId) REFERENCES person(id),
  FOREIGN KEY(actRoleId) REFERENCES act_role(id)
);
