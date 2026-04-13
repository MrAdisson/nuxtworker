import { db, schema } from '@nuxthub/db';

export default eventHandler(async (event) => {
  try {
    const { users } = schema;

    // Récupérer tous les utilisateurs
    const allUsers = await db.select().from(users).all();

    return {
      success: true,
      message: 'Database connected!',
      users: allUsers,
      count: allUsers.length,
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Database connection failed',
      error: error.message,
    };
  }
});
