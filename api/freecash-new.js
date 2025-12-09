const axios = require('axios');

module.exports = async (req, res) => {
  const TIKTOK_PIXEL_ID = 'D4S5A6JC77UE9IMLMC0G';
  const TIKTOK_ACCESS_TOKEN = '89f0208a96fee6ea708534b2cefb280b7bae1fc9';
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, ttclid, user_agent, page_url, referrer_url, event_id } = req.body;
    
    if (!TIKTOK_ACCESS_TOKEN) {
      return res.status(500).json({ success: false, error: 'Token não configurado' });
    }

    const ip_address = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || '0.0.0.0';
    
    // Gerar event_id se não fornecido
    const finalEventId = event_id || `${event_name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payload = {
      pixel_code: TIKTOK_PIXEL_ID,
      event: event_name || 'CompleteRegistration',
      event_id: finalEventId,
      timestamp: new Date().toISOString(),
      context: {
        ad: {
          callback: ttclid || ''
        },
        page: {
          url: page_url || '',
          referrer: referrer_url || ''
        },
        user: {
          external_id: '',
          phone_number: '',
          email: '',
          ip: ip_address,
          user_agent: user_agent || ''
        }
      },
      properties: {
        content_type: 'product',
        content_id: 'freecash-daily-offers',
        value: 1.00,
        currency: 'USD'
      }
    };

    console.log('📤 Enviando para TikTok (Freecash New):', JSON.stringify(payload, null, 2));

    const response = await axios.post(
      'https://business-api.tiktok.com/open_api/v1.3/pixel/track/',
      payload,
      {
        headers: {
          'Access-Token': TIKTOK_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Resposta TikTok (Freecash New):', response.data);

    return res.status(200).json({
      success: true,
      message: 'Conversão registrada (Freecash New)',
      event_id: finalEventId,
      tiktok_response: response.data
    });

  } catch (error) {
    console.error('❌ Erro (Freecash New):', error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data
    });
  }
};
