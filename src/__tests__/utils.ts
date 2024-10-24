export const pause = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const captureExportedBuffer = async (blob: Blob) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null) {
        return reject("e.target is null");
      }

      if (e.target.result === null) {
        return reject("e.target.result is null");
      }

      if (typeof e.target.result === "string") {
        return reject("e.target.result is string, not ArrayBuffer");
      }

      return resolve(e.target.result);
    };
    reader.readAsArrayBuffer(blob);
  });
};

export function arrayBufferAreEqual(a: ArrayBuffer, b: ArrayBuffer) {
  return dataViewsAreEqual(new DataView(a), new DataView(b));
}

export function dataViewsAreEqual(a: DataView, b: DataView) {
  if (a.byteLength !== b.byteLength) return false;
  for (let i = 0; i < a.byteLength; i++) {
    if (a.getUint8(i) !== b.getUint8(i)) {
      return false;
    }
  }
  return true;
}
