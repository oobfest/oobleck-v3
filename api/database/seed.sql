-- DateTime:
-- https://www.sqlitetutorial.net/sqlite-date/

INSERT INTO day (name, timestamp) VALUES 
  ("Tuesday",   1598943600000),
  ("Wednesday", 1599030000000),
  ("Thursday",  1599116400000),
  ("Friday",    1599202800000),
  ("Saturday",  1599289200000),
  ("Sunday",    1599375600000),
  ("Monday",    1599462000000);

INSERT INTO venue (name) VALUES
  ("ColdTowne Theater"),
  ("Fallout Theater"),
  ("Hideout Theatre");

INSERT INTO stage (name, venueId) VALUES
  ("ColdTowne", 1),
  ("Fallout", 2),
  ("Hideout Upstairs", 3),
  ("Hideout Downstairs", 3);

INSERT INTO user_role (name) VALUES 
  ("admin"),
  ("staff"),
  ("panelist");

INSERT INTO act_type(name) VALUES
  ("Improv"),
  ("Sketch"),
  ("Standup"),
  ("Podcast"),
  ("Musical"),
  ("One-person-show"),
  ("Variety"),
  ("Other");

INSERT INTO act_role(name) VALUES
  ("Perfromer"),
  ("Crew"),
  ("Director"),
  ("Producer"),
  ("Other");

INSERT INTO social_media_type(name) VALUES
  ("Website"),
  ("Twitter"),
  ("Instagram"),
  ("Facebook"),
  ("YouTube"),
  ("Other");

-- Cats for testin'
CREATE TABLE IF NOT EXISTS cat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, 
  isFluffy BOOLEAN
);

INSERT INTO cat (name, isFluffy) VALUES 
  ("Wilbur", FALSE), 
  ("Fern", FALSE);
