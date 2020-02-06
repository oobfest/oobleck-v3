CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  email TEXT, 
  password TEXT,
  roleId INTEGER,

  FOREIGN KEY(roleId) REFERENCES user_role(id)
);
