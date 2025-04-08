
/**
 * Converts a string to a URL-friendly slug
 * @param text The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w-]+/g, '')     // Remove all non-word chars
    .replace(/--+/g, '-')        // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

/**
 * Converts a slug back to a readable title
 * @param slug The slug to convert
 * @returns A readable title
 */
export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')          // Replace hyphens with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}
