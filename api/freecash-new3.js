const axios = require('axios');

module.exports = async (req, res) => {
  const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID_FREECASH3 || 'D4T5SGRC77U9L5PIV5N0';
  const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN_FREECASH3;
  
  // CORS - IMPORTANTE!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, ttclid, user_agent, page_url, referrer_url } = req.body;
    
    if (!TIKTOK_ACCESS_TOKEN) {
      console.error('❌ Token não configurado!');
      return res.status(500).json({ success: false, error: 'Token não configurado' });
    }
    
    const ip_address = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || '0.0.0.0';
    
    const payload = {
      pixel_code: TIKTOK_PIXEL_ID,
      event: event_name || 'CompleteRegistration',
      timestamp: new Date().toISOString(),
      context: {
        ad: { callback: ttclid || '' },
        page: { url: page_url || '', referrer: referrer_url || '' },
        user: { external_id: '', phone_number: '', email: '' },
        user_agent: user_agent || '',
        ip: ip_address
      },
      properties: {
        content_type: 'product',
        content_id: 'freecash-rewards',
        value: 1.00,
        currency: 'USD'
      }
    };
    
    console.log('📤 Enviando para TikTok (Freecash New2):', JSON.stringify(payload, null, 2));
    
    const response = await axios.post(
      'https://business-api.tiktok.com/open_api/v1.3/pixel/track/',
      payload,
      {
        headers: {
          'Access-Token': TIKTOK_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );
    
    console.log('✅ Resposta TikTok (Freecash New2):', response.data);
    
    return res.status(200).json({
      success: true,
      message: 'Conversão registrada (Freecash New2)',
      tiktok_response: response.data
    });
  } catch (error) {
    console.error('❌ Erro (Freecash New2):', error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data
    });
  }
};
