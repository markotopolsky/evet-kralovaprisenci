export function getPlaceholderImage(
  width: number,
  height: number,
  text: string
): string {
  const encodedText = encodeURIComponent(text);
  return `https://via.placeholder.com/${width}x${height}?text=${encodedText}`;
}

export function encodeToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function validateImage(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Nepodporovaný formát obrázka. Použite JPEG, PNG, WebP alebo GIF.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Obrázok je príliš veľký. Maximálna veľkosť je 5MB.",
    };
  }

  return { valid: true };
}



