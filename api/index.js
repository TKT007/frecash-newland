const axios = require('axios');

module.exports = async (req, res) => {
  console.log('🔔 ===== API CHAMADA =====');
  console.log('📍 Método:', req.method);
  console.log('📍 URL:', req.url);
  
  const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || 'D4DO8HRC77UCI3HO4RHG';
  const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
  
  // CORS - PERMITIR WORKERS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS request - retornando 200');
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    console.log('❌ Método não permitido:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📦 Body recebido:', JSON.stringify(req.body, null, 2));
    
    const { event_name, ttclid, user_agent, page_url, referrer_url } = req.body;
    
    console.log('🎯 event_name:', event_name);
    console.log('🎯 ttclid:', ttclid);
    console.log('🎯 user_agent:', user_agent?.substring(0, 50) + '...');
    
    if (!TIKTOK_ACCESS_TOKEN) {
      console.error('❌ TIKTOK_ACCESS_TOKEN não configurado!');
      return res.status(500).json({ success: false, error: 'Token não configurado' });
    }
    
    console.log('✅ Token configurado:', TIKTOK_ACCESS_TOKEN.substring(0, 10) + '...');
    
    const ip_address = req.headers['x-forwarded-for']?.split(',')[0] || '0.0.0.0';
    console.log('🌐 IP:', ip_address);
    
    const payload = {
      pixel_code: TIKTOK_PIXEL_ID,
      event: event_name || 'CompleteRegistration',
      timestamp: Math.floor(Date.now() / 1000),
      context: {
        ad: { callback: ttclid || '' },
        page: { url: page_url || '', referrer: referrer_url || '' },
        user: { external_id: '', phone_number: '', email: '' },
        user_agent: user_agent || '',
        ip: ip_address
      },
      properties: {
        content_type: 'product',
        content_id: 'freecash-tiktok-rewards',
        value: 1.00,
        currency: 'USD'
      }
    };

    console.log('📤 Enviando para TikTok:', JSON.stringify(payload, null, 2));

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

    console.log('✅ Resposta TikTok:', response.data);

    return res.status(200).json({ 
      success: true, 
      message: 'Conversão registrada',
      tiktok_response: response.data
    });
  } catch (error) {
    console.error('❌ ERRO:', error.message);
    console.error('❌ Resposta erro:', error.response?.data);
    
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data
    });
  }
};
