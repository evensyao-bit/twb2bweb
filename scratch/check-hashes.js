import bcrypt from 'bcryptjs';

const passwords = [
  'va*lq!Lmp6209',
  '8*krun/1364!'
];

async function check() {
  for (const p of passwords) {
    const hash = await bcrypt.hash(p, 10);
    console.log(`Password: ${p}`);
    console.log(`Hash: ${hash}`);
  }
}

check();
