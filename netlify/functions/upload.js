import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

export async function handler(event) {
  console.log("=== Incoming Request ===");
  console.log("HTTP Method:", event.httpMethod);
  console.log("Headers:", JSON.stringify(event.headers, null, 2));
  console.log("Raw Body:", event.body);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    let body;
    const contentType = event.headers["content-type"] || event.headers["Content-Type"];
    if (contentType && contentType.includes("application/json")) {
      body = JSON.parse(event.body);
    } else {
      const params = new URLSearchParams(event.body);
      body = Object.fromEntries(params);
    }

    const payload = Array.isArray(body) ? body : [body];
    const recordsToCreate = payload.map(entry => {
      const fields = {};
      for (const [key, value] of Object.entries(entry)) {
        if (key === "Timestamp" && !value) {
          fields.Timestamp = new Date().toISOString();
        } else {
          fields[key] = value;
        }
      }
      if (!fields.Timestamp) {
        fields.Timestamp = new Date().toISOString();
      }
      return { fields };
    });

    console.log("Will create records:", JSON.stringify(recordsToCreate, null, 2));

    // ✅ 改这里，使用 base 调用 table
    await base(process.env.AIRTABLE_TABLE_NAME).create(recordsToCreate);

    return { statusCode: 200, body: "Data stored successfully" };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: error.toString() };
  }
}
