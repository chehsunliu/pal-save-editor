function createTracer() {
  if (import.meta.env.DEV) {
    return {
      gtag: () => {},
    };
  }

  return { gtag: window.gtag };
}

export const tracer = createTracer();
