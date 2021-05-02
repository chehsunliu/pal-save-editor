export const saveBinary = (storageKey: string, buffer: ArrayBuffer) => {
  localStorage.setItem(storageKey, btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer)))));
};

export const loadBinaryAsArrayBuffer = (storageKey: string): ArrayBuffer | null => {
  const b64blob = localStorage.getItem(storageKey);
  if (b64blob === null) {
    return null;
  }

  const byteArray = Uint8Array.from(
    atob(b64blob)
      .split("")
      .map((c) => c.charCodeAt(0))
  );

  return byteArray.buffer;
};
