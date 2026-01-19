import type { ImageRequest } from "../Service/DTO/RequestBody";

export const fileToImage = (file: File): Promise<ImageRequest> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as ArrayBuffer;
            const bytes = new Uint8Array(result);
            let binary = ""; 
            const len = bytes.byteLength; 
            for (let i = 0; i < len; i++) { 
                binary += String.fromCharCode(bytes[i]); 
            } 
            const base64String = btoa(binary);
            resolve({
                name: file.name,
                content: base64String,
            });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export const convertToObjectUrl = (image: string | File) => {
    return image instanceof File ?  URL.createObjectURL(image) : `data:image;base64,${image}`
}