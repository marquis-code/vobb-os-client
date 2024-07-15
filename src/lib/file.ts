export const isFile = (value: any): value is File => value instanceof File;
export const isValidFileType = (file: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  return validTypes.includes(file.type);
};
