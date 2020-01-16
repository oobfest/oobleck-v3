CREATE TABLE workshop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT,
  slug TEXT,
  description TEXT,

  price INTEGER,
  auditPrice INTEGER,
  capacity INTEGER,
  auditCapacity INTEGER
);

CREATE TABLE workshop_to_performer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workshopId INTEGER,
  performerId INTEGER,
  FOREIGN KEY(workshopId) REFERENCES workshop(id),
  FOREIGN KEY(performerId) REFERENCES performer(id)
);

CREATE TABLE workshop_session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER,
  workshopId INTEGER,
  dayId INTEGER,
  venueId INTEGER,

  FOREIGN KEY(workshopId) REFERENCES workshop(id),
  FOREIGN KEY(dayId) REFERENCES day(id),
  FOREIGN KEY(venueId) REFERENCES venue(id)
);

CREATE TABLE workshop_ticket (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  isRefunded BOOLEAN,
  isAudit BOOLEAN,
  isUpgraded BOOLEAN
);
