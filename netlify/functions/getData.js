// netlify/functions/getData.js
require('dotenv').config();

exports.handler = async () => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME; // 例如 "Sensor Records"
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!apiKey || !baseId || !tableName) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing env: AIRTABLE_API_KEY / AIRTABLE_BASE_ID / AIRTABLE_TABLE_NAME' })
      };
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    const text = await res.text(); // 保留原始响应，便于排错
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // 前端直连时需要
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
