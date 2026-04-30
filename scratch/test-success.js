import { verifyUser } from '../src/lib/auth-utils';

async function testSuccess() {
  const email = 'yiwensyao@gmail.com';
  const password = 'va*lq!Lmp6209'; // Correct password

  console.log('Testing correct credentials...');
  const result = await verifyUser(email, password);
  if (result) {
    console.log('SUCCESS: Logged in successfully');
    console.log(result);
  } else {
    console.error('FAILED: Could not log in with correct credentials');
  }
}

testSuccess();
