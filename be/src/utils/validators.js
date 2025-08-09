import fs from "fs";
import path from "path";
import mime from "mime-types";

/**
 * Kiểm tra định dạng MBTI (ví dụ: INFP, ESTJ)
 */
export function validateMBTI(type) {
  const mbtiRegex =
    /^(INTJ|INTP|ENTJ|ENTP|INFJ|INFP|ENFJ|ENFP|ISTJ|ISFJ|ESTJ|ESFJ|ISTP|ISFP|ESTP|ESFP)$/;
  return mbtiRegex.test(type.toUpperCase());
}

/**
 * Kiểm tra xem `answers` có phải là mảng số hợp lệ không
 */
export function validateAnswers(answers) {
  return Array.isArray(answers) && answers.every((a) => typeof a === "number");
}

/**
 * Kiểm tra file ảnh
 */
export function isValidImage(filePath) {
  if (!fs.existsSync(filePath)) return false;

  const ext = path.extname(filePath).toLowerCase();
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"];
  return allowedExts.includes(ext);
}

export function getMimeType(filePath) {
  return mime.lookup(filePath) || "application/octet-stream";
}

export function readImageAsUint8Array(filePath) {
  return new Uint8Array(fs.readFileSync(filePath));
}
