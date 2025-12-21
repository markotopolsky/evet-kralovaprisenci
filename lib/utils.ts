export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return d.toLocaleDateString("sk-SK", options);
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  return d.toLocaleDateString("sk-SK", options);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+421)?\s*\d{3}\s*\d{3}\s*\d{3}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function validateRequired(value: string, fieldName: string): { valid: boolean; error?: string } {
  if (!value || value.trim().length === 0) {
    return { valid: false, error: `${fieldName} je povinné pole` };
  }
  return { valid: true };
}

export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): { valid: boolean; error?: string } {
  if (value.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} musí mať aspoň ${minLength} znakov`,
    };
  }
  return { valid: true };
}

export function validateInput(validations: { valid: boolean; error?: string }[]): {
  valid: boolean;
  errors: string[];
} {
  const errors = validations.filter((v) => !v.valid && v.error).map((v) => v.error as string);

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
