CREATE TABLE show_slot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
  isHidden BOOLEAN DEFAULT FALSE,
  actId INTEGER,
  showId INTEGER,

  duration INTEGER,
  
  -- One to Many: a show can have multiple show slots
  FOREIGN KEY(showId) REFERENCES show(id)
  
  -- One to Many: an act can have multiple show slots
  FOREIGN KEY(actId) REFERENCES act(id)
);