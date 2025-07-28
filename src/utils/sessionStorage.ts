export function saveToSessionStorage<T>(key: string, value: T) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function loadFromSessionStorage<T>(key: string): T | null {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeFromSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}
