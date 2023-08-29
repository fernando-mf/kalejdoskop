export function indexByProp<T extends Record<string, any>>(data: T[], key: keyof T) {
  return data.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item[key]]: item,
      };
    },
    {} as Record<T[keyof T], T>,
  );
}
