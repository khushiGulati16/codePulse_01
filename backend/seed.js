const { User, Problem } = require('./models');

const users = [
  {
    "name": "Admin User",
    "email": "admin@codepulse.com",
    "password": "$2b$10$.ufUxz4ULK9z.0ejH0cwxufER8KdjUhuZu4Nwoxlmbvftx/FTlvzW",
    "role": "admin"
  },
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$10$M/J6IG6mO3wlNmgaY5544eBHTpv5/gpLmAjVrpgLxpaMZK0eavKLm",
    "role": "user"
  },
  {
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$Y5BL//8SNNT1YbwBok47V.EDN1JE.77giObPxR8rGEbWJitVhSPNS",
    "role": "admin"
  }
];

async function seed() {
    try {
        await User.bulkCreate(users, { ignoreDuplicates: true });
        console.log('Seeded users successfully');
    } catch (err) {
        console.error(err);
    }
}
seed();
