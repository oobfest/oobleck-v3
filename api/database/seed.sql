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
  ("panelist"),
  ("standup-panelist");

INSERT INTO act_type(name) VALUES
  ("Improv"),
  ("Sketch"),
  ("Standup"),
  ("Podcast"),
  ("Musical"),
  ("One-Person Show"),
  ("Hosted Variety or Panel Show"),
  ("Other");

INSERT INTO act_role(name) VALUES
  ("Performer"),
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

INSERT INTO person(name, bio, email, phone, isHidden, isConfirmed) VALUES
  ("Jill Bernard", "From Minnesota!", "jill@example.com", "(555) KL5-0000", FALSE, FALSE),
  ("Chris Curl", "Bald", "chris@example.com", "(555) KL5-0001", FALSE, FALSE),
  ("Ash Dropout", "Can't commit", "ash@example.com", "000-000-0000", TRUE, FALSE),
  ("Marlgrelt Hunsuck", NULL, "m@example.com", NULL, FALSE, FALSE),
  ("Stacie Standup", NULL, "s@example.com", NULL, FALSE, FALSE),
  ("Charles Cheapskate", NULL, "c@example.com", '555-KL5-0002', FALSE, FALSE),
  ("Lizzie Investrus", NULL, "ci@example.com", "123-4567", FALSE, FALSE),
  ("Pat Investrus", NULL, NULL, NULL, FALSE, FALSE),
  ("Douglas Investrus", NULL, NULL, NULL, FALSE, FALSE);

INSERT INTO workshop(name, slug, description, price, auditPrice, capacity, auditCapacity) VALUES
  ("Improv for Walruses", "improv-for-walruses", "Finally, a workshop for the rest of us.", 10, 5, 20, 25);

INSERT INTO workshop_to_person(workshopId, personId) VALUES
  (1, 1), (1, 2);

INSERT INTO act(name, slug, creationDate, showTitle, country, stateOrProvince, city, associatedTheater, publicDescription, privateDescription, accolades, imageUrl, imageDeleteUrl, videoUrl1, videoUrl2, videoInformation, techNeeds, maximumTime, minimumTime, contactName, contactPhone, contactEmail, contactRoleId, isHeadliner, isLocal, isPaid, isAccepted, isConfirmed) VALUES
  ('Giggle Gang', 'giggle-gang', 0, NULL, 'US', 'TX', 'Austin', 'ColdTowne', 'Fun loving', 'We secretly hate fun', 'Oscar for Best Improv', 'ourCOyv', 'L4Gqf18JLJYd7c0', 'example.com/vid1', 'example.com/vid2', 'swordfish', 'Chairs', 420, 69, 'Tyler', '555', 't@example.com', 0, FALSE, TRUE, TRUE, TRUE, FALSE),
  ('Stacie Standup', 'stacie-standup', 0, NULL, 'US', 'GA', 'Atlanta', NULL, 'Good at standup', 'Okay at at standup', '', NULL, NULL, 'http://example.com/vid1b', 'http://example.com/vid2b', 'django', 'Nothing', 4200, 690, 'Stacie', '555-KL5-0000', 's@example.com', 0, FALSE, FALSE, TRUE, FALSE, FALSE),
  ('The Cheapskates', 'the-cheapskates', 0, NULL, 'CA', 'B.C.', 'Anti-vancouver', NULL, 'Blah', 'Blah', '', NULL, NULL, 'http://example.com/vid1c', '', '', '', 4200, 690, 'Charles Cheapskate', '555-KL5-0001', 'c@example.com', 0, FALSE, FALSE, FALSE, FALSE, FALSE),
  ('The Wealthies', 'the-wealthies', 0, NULL, 'CA', 'British Columbia', 'Vancouver', NULL, 'Wow', 'Great', '', NULL, NULL, 'http://example.com/vid1c', 'http://example.com/vid1d', '', '', 4200, 690, 'Charles Cheapskate', '555-KL5-0001', 'c@example.com', 0, FALSE, FALSE, TRUE, FALSE, FALSE);

INSERT INTO act_to_person(actId, personId, actRoleId) VALUES
  (1, 1, 3), (1, 4, 1), 
  (2, 5, 1), (3, 6, 1), 
  (4, 7, 1), (4, 8, 1), (4, 9, 1);

INSERT INTO act_to_act_type(actId, actTypeId) VALUES
  (1, 5), (1, 1), (2, 3), (3, 2), (4, 2);

INSERT INTO show(name, dayId, stageId, timestamp, duration) VALUES
  (NULL, 2, 1, 1599009300000, 90),
  ("Character Showcase", 1, 4, 1599276600000, 60);

-- Cats for testin'
CREATE TABLE IF NOT EXISTS cat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, 
  isFluffy BOOLEAN
);

INSERT INTO cat (name, isFluffy) VALUES 
  ("Wilbur", FALSE), 
  ("Fern", FALSE);
