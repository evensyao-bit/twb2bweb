import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'yiwensyao@gmail.com',
    password: 'va*lq!Lmp6209',
    hash: '$2b$10$sBArwL/L2wINoljBAfkY1edh1d/8GcpLJnejok4XYByNPj2jVXRby'
  },
  {
    email: 'kuo.abacus@gmail.com',
    password: '8*krun/1364!',
    hash: '$2b$10$1tDqtK5o7ygFVJA/VN3CMO2uu7clniw9tINjYfA74B/OwvmPoKtm2'
  }
];

async function check() {
  for (const user of users) {
    const isValid = await bcrypt.compare(user.password, user.hash);
    console.log(`Email: ${user.email}, Password: ${user.password}, Valid: ${isValid}`);
  }
}

check();
