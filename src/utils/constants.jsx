export const SITE_KEY = "6LcvVOgrAAAAAPTVkJcjjhtrLt8Q2g3QJjoUc-RO";

// export const API_URL = "http://localhost/hiveback";
export const API_URL = "https://ryupunch.com/hiveback";


// export const FRONTEND_URL = "http://localhost:5175";
export const FRONTEND_URL = "https://kavin-hive-two.vercel.app";


export function formatTime(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Options for month/day/year
  const options = {
    year: 'numeric',
    month: 'long',   // short month name (Jan, Feb, Mar...)
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true      // 12-hour format with AM/PM
  };

  return date.toLocaleString('en-US', options);
}

// utils/helpers.js
export function getReadTime(htmlContent) {
  if (!htmlContent) return "0 min read";

  // Convert HTML to plain text safely
  const text = htmlContent
    .replace(/<[^>]+>/g, " ")       // remove HTML tags
    .replace(/\s+/g, " ")           // collapse extra spaces
    .trim();

  if (!text) return "0 min read";   // handle cases where only tags exist

  // Count words
  const words = text.split(" ").length;

  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200);

  const final = minutes + 2;

  return `${final || 1} min read`;
}
