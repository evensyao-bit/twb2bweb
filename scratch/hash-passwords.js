import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'yiwensyao@gmail.com',
    password: 'va*lq!Lmp6209'
  },
  {
    email: 'kuo.abacus@gmail.com',
    password: '8*krun/1364!'
  }
];

async function generateHashes() {
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Hash: ${hash}`);
    console.log('---');
  }
}

generateHashes();
