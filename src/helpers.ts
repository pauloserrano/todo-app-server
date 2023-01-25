export function exclude<T, K extends keyof T>(data: T, keys: K[]): Omit<T, K> {
  for (const key of keys) { delete data[key] }

  return data
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>
