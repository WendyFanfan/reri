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
    let TEMP, HUM;


    // 根据 Content-Type 判断数据类型
    const contentType = event.headers["content-type"] || event.headers["Content-Type"];

    if (contentType && contentType.includes("application/json")) {
      // 接收 JSON 格式
      const body = JSON.parse(event.body);
      TEMP = body.TEMP;
      HUM = body.HUM;
    } else {
      // 原来的 form-urlencoded 解析方式
      const params = new URLSearchParams(event.body);
      TEMP = params.get("TEMP");
      HUM = params.get("HUM");
    }

    await base(process.env.AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          TEMP: Number(TEMP),
          HUM: Number(HUM),
          Timestamp: new Date().toISOString()
        }
      }
    ]);

    return { statusCode: 200, body: "Data stored successfully" };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
