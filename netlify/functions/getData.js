require('dotenv').config();

exports.handler = async (event) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!apiKey || !baseId || !tableName) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing env vars' })
      };
    }

    const { start, end } = event.queryStringParameters || {};
    let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    if (start && end) {
      // 时间戳转 ISO（Airtable 的 Date 类型字段需要 ISO 格式）
      const startISO = new Date(Number(start)).toISOString();
      const endISO = new Date(Number(end)).toISOString();

      url += `?filterByFormula=AND(IS_AFTER({Timestamp}, '${startISO}'), IS_BEFORE({Timestamp}, '${endISO}'))`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
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
