CREATE TABLE host (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  performerId INTEGER,
  FOREIGN KEY(performerId) REFERENCES performer(id),
);

CREATE TABLE host_to_performer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hostId INTEGER,
  performerId INTEGER,
  FOREIGN KEY(hostId) REFERENCES host(id),
  FOREIGN KEY(performerId) REFERENCES performer(id),
);
