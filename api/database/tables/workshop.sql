CREATE TABLE workshop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,

  name TEXT,
  slug TEXT,
  description TEXT,

  price INTEGER,
  auditPrice INTEGER,
  capacity INTEGER,
  auditCapacity INTEGER
);

CREATE TABLE workshop_to_person (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workshopId INTEGER,
  personId INTEGER,
  
  FOREIGN KEY(workshopId) REFERENCES workshop(id),
  
  FOREIGN KEY(personId) REFERENCES person(id)
);

CREATE TABLE workshop_ticket (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerId INTEGER,
  workshopId INTEGER,
  isRefunded BOOLEAN,
  isAudit BOOLEAN,
  isUpgraded BOOLEAN
);
