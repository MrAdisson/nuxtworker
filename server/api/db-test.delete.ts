import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {
  try {
    const { users } = schema;
    const query = getQuery(event);
    const userId = query.id ? Number(query.id) : null;

    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      };
    }

    await db.delete(users).where(eq(users.id, userId));

    return {
      success: true,
      message: 'User deleted successfully',
      userId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to delete user',
      error: error.message,
    };
  }
});
