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

/**
 * Kiểm tra điểm số MI có hợp lệ không
 */
export function validateMIScores(scores) {
  const requiredTypes = [
    "Vận động",
    "Âm nhạc",
    "Thiên nhiên",
    "Không gian",
    "Triết học",
    "Ngôn ngữ",
    "Xã hội",
    "Nội tâm",
    "Logic",
  ];

  // Kiểm tra có đủ 9 loại trí thông minh
  if (!scores || Object.keys(scores).length !== requiredTypes.length) {
    return false;
  }

  // Kiểm tra tất cả các loại đều có mặt và là số
  return requiredTypes.every(
    (type) =>
      scores.hasOwnProperty(type) &&
      typeof scores[type] === "number" &&
      scores[type] >= 0
  );
}

/**
 * Kiểm tra loại trí thông minh chủ đạo hợp lệ
 */
export function validateDominantIntelligence(type) {
  const validTypes = [
    "Vận động",
    "Âm nhạc",
    "Thiên nhiên",
    "Không gian",
    "Triết học",
    "Ngôn ngữ",
    "Xã hội",
    "Nội tâm",
    "Logic",
  ];
  return validTypes.includes(type);
}

/**
 * Kiểm tra mảng answers cho bài test MI (86 câu, điểm 1-5)
 */
export function validateMIAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== 86) {
    return false;
  }

  return answers.every((a) => Number.isInteger(a) && a >= 1 && a <= 5);
}

/**
 * Kiểm tra giới tính hợp lệ
 */
export function validateGender(gender) {
  return ["male", "female"].includes(gender);
}

/**
 * Kiểm tra dữ liệu gửi lên từ bài test MI
 */
export function validateMISubmission(data) {
  return (
    data &&
    validateMIAnswers(data.answers) &&
    validateGender(data.gender) &&
    validateMIScores(data.miScores) &&
    validateDominantIntelligence(data.dominantIntelligence)
  );
}
