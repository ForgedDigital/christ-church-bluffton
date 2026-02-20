async function breezeRequest(endpoint, params) {
  const url = new URL(endpoint, process.env.BREEZE_URL + '/');
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Api-Key': process.env.BREEZE_API_KEY }
  });
  if (!res.ok) throw new Error(`Breeze API ${res.status}: ${await res.text()}`);
  const text = await res.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { fullName, email, phone, interest, message } = JSON.parse(event.body);

    if (!fullName || !email || !interest) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Full name, email, and interest are required.' }) };
    }

    const spaceIdx = fullName.trim().indexOf(' ');
    const first = spaceIdx > 0 ? fullName.trim().substring(0, spaceIdx) : fullName.trim();
    const last = spaceIdx > 0 ? fullName.trim().substring(spaceIdx + 1) : '';

    // Add person to Breeze
    const fields = JSON.stringify({
      [process.env.BREEZE_EMAIL_FIELD_ID]: { field_type: 'email', response: true, details: { address: email } },
      ...(phone ? { [process.env.BREEZE_PHONE_FIELD_ID]: { field_type: 'phone', response: true, details: { phone_mobile: phone } } } : {})
    });
    const person = await breezeRequest('people/add', { first, last, fields_json: fields });

    // Assign "Contact Form" tag
    await breezeRequest('tags/assign', { person_id: person.id, tag_id: process.env.BREEZE_TAG_CONTACT });

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Christ Church Bluffton <notifications@resend.dev>',
          to: process.env.NOTIFY_EMAIL,
          subject: `New Contact Form — ${fullName}`,
          text: `New contact form submission:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || '(none)'}\nInterest: ${interest}\nMessage: ${message || '(none)'}`
        })
      });
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('[Contact] Error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Something went wrong. Please try again.' }) };
  }
};
