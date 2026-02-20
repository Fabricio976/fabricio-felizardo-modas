import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imageName: string | undefined) => {
  if (!imageName) return "/placeholder.jpg"; 
  if (imageName.startsWith("http")) return imageName; 
  return `http://localhost:3000/files/${imageName}`;
};
