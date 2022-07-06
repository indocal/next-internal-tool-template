import { isObject } from '../isObject';

export function isDeepEqual(object: unknown, target: unknown): boolean {
  if (isObject(object) && isObject(target)) {
    const objectKeys = Object.keys(object as object);
    const targetKeys = Object.keys(target as object);

    if (objectKeys.length !== targetKeys.length) return false;

    for (const key of objectKeys) {
      const objectValueAtKey = (object as Record<string, unknown>)[key];
      const targetValueAtKey = (target as Record<string, unknown>)[key];

      const areObjects =
        isObject(objectValueAtKey) && isObject(targetValueAtKey);

      if (
        (areObjects && !isDeepEqual(objectValueAtKey, targetValueAtKey)) ||
        (!areObjects && !Object.is(objectValueAtKey, targetValueAtKey))
      )
        return false;
    }

    return true;
  } else {
    return Object.is(object, target);
  }
}

export default isDeepEqual;
