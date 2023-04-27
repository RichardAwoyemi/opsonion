export function debounce(delay = 300): MethodDecorator {
  return (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const original = descriptor.value;
    const key = `__timeout__${propertyKey}`;
    descriptor.value = function (...args) {
      clearTimeout(this[key]);
      this[key] = setTimeout(() => original.apply(this, args), delay);
    };
    return descriptor;
  };
}
