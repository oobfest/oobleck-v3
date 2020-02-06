CREATE TABLE social_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isHidden BOOLEAN DEFAULT FALSE,
  actId INTEGER,
  socialMediaTypeId INTEGER,

  url TEXT,
  
  -- One to many: Social Media Type -> Social Media
  -- Ex. twitter.com/tyerlanecodes is of type "Twitter"
  FOREIGN KEY(socialMediaTypeId) REFERENCES social_media_type(id)
  
  -- One to many: Act -> Social Media
  -- Ex. Channel 2 has a Twitter account and Instagram account
  FOREIGN KEY(actId) REFERENCES act(id)
);
