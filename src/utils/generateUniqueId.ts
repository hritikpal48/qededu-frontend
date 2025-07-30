export function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9); // e.g., "5g8b9kd4z"
}
