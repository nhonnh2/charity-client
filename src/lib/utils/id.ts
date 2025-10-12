/**
 * Generate unique ID utilities
 */

/**
 * Generate a unique ID using crypto API
 * Uses native crypto.randomUUID() for security and uniqueness
 *
 * @returns {string} UUID v4 string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 */
export function generateId(): string {
  // Check if crypto.randomUUID is available (modern browsers & Node 19+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older environments
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a short unique ID (for UI purposes only, not cryptographically secure)
 *
 * @returns {string} Short ID (e.g., "a1b2c3d4e")
 */
export function generateShortId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Generate a numeric ID based on timestamp
 * Useful for temporary IDs that need to be sortable
 *
 * @returns {number} Timestamp-based ID
 */
export function generateNumericId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}
