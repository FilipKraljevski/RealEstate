import type { Image } from "../Service/DTO/RequestBody";

export const fileToImage = (file: File): Promise<Image> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as ArrayBuffer;
            // Convert ArrayBuffer → Uint8Array
            const bytes = new Uint8Array(result);
            resolve({
                name: file.name,
                content: bytes, // or Buffer.from(bytes) if needed
            });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export const convertToObjectUrl = (image: string | File) => {
    return image instanceof File ?  URL.createObjectURL(image) : image
}