CREATE TABLE social_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT,
  socialMediaTypeId INTEGER,
  FOREIGN KEY(socialMediaTypeId) REFERENCES social_media_type(id)
);

CREATE TABLE social_media_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);
