import { db, schema } from '@nuxthub/db';

export default eventHandler(async (event) => {
  try {
    const { users } = schema;

    // Générer un email et nom aléatoire pour chaque utilisateur test
    const randomNum = Math.floor(Math.random() * 10000);

    const newUser = await db
      .insert(users)
      .values({
        email: `test${randomNum}@example.com`,
        name: `Test User ${randomNum}`,
        passwordHash: 'hash_placeholder_test',
        avatar: `https://i.pravatar.cc/150?img=${randomNum % 70}`,
      })
      .returning();

    return {
      success: true,
      message: 'User created successfully',
      user: newUser[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to create user',
      error: error.message,
    };
  }
});
