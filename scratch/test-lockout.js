import { verifyUser } from '../src/lib/auth-utils';

async function testLockout() {
  const email = 'yiwensyao@gmail.com';
  const wrongPassword = 'wrong-password';

  console.log('Testing failed attempts...');
  for (let i = 1; i <= 5; i++) {
    const result = await verifyUser(email, wrongPassword);
    console.log(`Attempt ${i}: Result: ${result}`);
  }

  console.log('Testing 6th attempt (should be locked)...');
  try {
    await verifyUser(email, wrongPassword);
    console.error('FAILED: Should have thrown an error for lockout');
  } catch (error) {
    console.log(`SUCCESS: Caught expected error: ${error.message}`);
  }
}

testLockout();
