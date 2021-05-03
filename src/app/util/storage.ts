export const saveBinary = (storageKey: string, buffer: ArrayBuffer) => {
  const data = new Uint8Array(buffer).reduce((acc, i) => acc + String.fromCharCode(...[i]), "");
  localStorage.setItem(storageKey, btoa(data));
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
