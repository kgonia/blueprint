export async function resolve(specifier, context, defaultResolve) {
  const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
  const isBareThreeExample = specifier.startsWith('three/examples/') && !specifier.endsWith('.js');

  if (isRelative && !specifier.match(/\.[a-z]+$/i)) {
    try {
      return await defaultResolve(`${specifier}.js`, context, defaultResolve);
    } catch {
      return defaultResolve(specifier, context, defaultResolve);
    }
  }

  if (isBareThreeExample) {
    try {
      return await defaultResolve(`${specifier}.js`, context, defaultResolve);
    } catch {
      return defaultResolve(specifier, context, defaultResolve);
    }
  }

  return defaultResolve(specifier, context, defaultResolve);
}
