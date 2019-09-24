db.auth('admin', 'password')

db = db.getSiblingDB('booking')

db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
})