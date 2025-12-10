const axios = require('axios');

module.exports = async (req, res) => {
  // Configuração dos pixels usando as variáveis de ambiente da Vercel
  const PIXELS = [
    {
      id: process.env.TIKTOK_PIXEL_ID || 'D4DO8HRC77UCI3HO4RHG',
      token: process.env.TIKTOK_ACCESS_TOKEN
    },
    {
      id: process.env.TIKTOK_PIXEL_ID_FREECASH_NEW || 'D4S5A6JC77UE9IMLMC0G',
      token: process.env.TIKTOK_ACCESS_TOKEN_FREECASH_NEW
    }
  ].filter(p => p.id && p.token); // Remove pixels sem token configurado
  
  // DEBUG: Log das variáveis (primeiros 10 caracteres do token)
  console.log('🔍 Pixels configurados:');
  PIXELS.forEach(p => {
    console.log(`  - Pixel: ${p.id}`);
    console.log(`  - Token: ${p.token ? p.token.substring(0, 10) + '...' : 'NÃO CONFIGURADO'}`);
  });
  
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
    
    if (PIXELS.length === 0) {
      return res.status(500).json({ success: false, error: 'Nenhum pixel configurado' });
    }

    const ip_address = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || '0.0.0.0';
    
    // Gerar event_id se não fornecido
    const finalEventId = event_id || `${event_name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Enviar para TODOS os pixels configurados
    const results = await Promise.allSettled(
      PIXELS.map(async (pixel) => {
        const payload = {
          pixel_code: pixel.id,
          event: event_name || 'CompleteRegistration',
          timestamp: Math.floor(Date.now() / 1000),
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
            content_id: 'freecash-tiktok-rewards',
            value: 1.00,
            currency: 'USD'
          }
        };

        console.log(`📤 Enviando ${event_name} para pixel ${pixel.id}`);

        const response = await axios.post(
          'https://business-api.tiktok.com/open_api/v1.3/pixel/track/',
          payload,
          {
            headers: {
              'Access-Token': pixel.token,
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );

        console.log(`✅ Pixel ${pixel.id} respondeu:`, response.data);
        
        return {
          pixel_id: pixel.id,
          success: true,
          data: response.data
        };
      })
    );

    // Verificar resultados
    const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').map(r => ({
      error: r.reason.message,
      details: r.reason.response?.data
    }));

    if (failed.length > 0) {
      console.error('❌ Alguns pixels falharam:', failed);
    }

    return res.status(200).json({
      success: successful.length > 0,
      message: `Evento ${event_name} enviado para ${successful.length}/${PIXELS.length} pixels`,
      event_id: finalEventId,
      pixels_successful: successful.map(s => s.pixel_id),
      pixels_failed: failed.length,
      tiktok_response: successful.length > 0 ? successful[0].data : null
    });

  } catch (error) {
    console.error('❌ Erro geral:', error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data
    });
  }
};
