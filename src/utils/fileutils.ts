export const isFileUri = (uri: string) => uri.startsWith('file://');
export const isBase64DataUri = (uri: string) => uri.startsWith('data:image/');