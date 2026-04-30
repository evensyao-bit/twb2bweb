import bcrypt from 'bcryptjs';

export const USERS = [
  {
    email: 'yiwensyao@gmail.com',
    passwordHash: '$2b$10$sBArwL/L2wINoljBAfkY1edh1d/8GcpLJnejok4XYByNPj2jVXRby',
    name: 'Yiwen Yao'
  },
  {
    email: 'kuo.abacus@gmail.com',
    passwordHash: '$2b$10$1tDqtK5o7ygFVJA/VN3CMO2uu7clniw9tINjYfA74B/OwvmPoKtm2',
    name: 'Kuo Abacus'
  }
];

// Simple in-memory tracker for failed login attempts
// In a production environment, this should ideally be in a database or Redis
const FAILED_ATTEMPTS = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

export async function verifyUser(email: string, password?: string) {
  if (!password) return null;
  
  const now = Date.now();
  const normalizedEmail = email.trim().toLowerCase();
  const attempt = FAILED_ATTEMPTS.get(normalizedEmail);

  if (attempt && attempt.count >= MAX_ATTEMPTS && now - attempt.lastAttempt < LOCK_TIME) {
    const minutesLeft = Math.ceil((LOCK_TIME - (now - attempt.lastAttempt)) / 60000);
    throw new Error(`Account temporarily locked. Please try again in ${minutesLeft} minutes.`);
  }

  const user = USERS.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    const currentCount = attempt ? attempt.count + 1 : 1;
    FAILED_ATTEMPTS.set(normalizedEmail, { count: currentCount, lastAttempt: now });
    return null;
  }

  // Success: Clear failed attempts
  FAILED_ATTEMPTS.delete(normalizedEmail);

  return {
    id: user.email,
    email: user.email,
    name: user.name,
  };
}
