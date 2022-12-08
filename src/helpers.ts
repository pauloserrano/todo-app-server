export function exclude<T, K extends keyof T>(data: T, keys: K[]): Omit<T, K> {
  for (const key of keys) { delete data[key] }

  return data
}
