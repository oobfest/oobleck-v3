CREATE TABLE act (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creation_date INTEGER,

  -- [name] presents [show title]
  -- from [associated_theater], [city], [state_or_province], [country]
  name TEXT,
  slug TEXT,
  showTitle TEXT,
  country TEXT,
  stateOrProvince TEXT,
  city TEXT,
  associatedTheater TEXT,
  isHeadliner BOOLEAN,

  -- Information about the act
  publicDescription TEXT,
  privateDescription TEXT,
  accolades TEXT,

  -- Image deets
  imageUrl TEXT,
  imageDeleteUrl TEXT,

  -- Video submission
  videoUrl1 TEXT,
  videoUrl2 TEXT,
  videoInformation TEXT,

  -- Act deets
  techNeeds TEXT,
  minimumTime INTEGER,
  maximumTime INTEGER,

  -- Contact information
  contactName TEXT,
  contactPhone TEXT,
  contactEmail TEXT,
  contactRole TEXT,

  -- Payment
  isPaid BOOLEAN,
  isAccepted BOOLEAN,
  isConfirmed BOOLEAN,

  -- Social Media, Many to Many
  -- Availablity, Many to Many
  -- Act Type, Many to Many
);

CREATE TABLE act_to_social_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actId INTEGER,
  FOREIGN KEY(actId) REFERENCES act(id),
  socialMediaId INTEGER,
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
  FOREIGN KEY(actTypeId) REFERENCES act_type(id)
  FOREIGN KEY(actRoleId) REFERENCES act_role(id),
);
