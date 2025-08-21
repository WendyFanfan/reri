// frontend/src/api/getData.js
export async function getData() {
  const res = await fetch("/.netlify/functions/getData");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
