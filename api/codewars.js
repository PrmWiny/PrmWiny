export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.codewars.com/api/v1/users/PrmWiny');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: `Codewars API responded with status ${response.status}` });
    }
    
    const data = await response.json();
    
    // Cache the response at the edge for 1 hour (3600 seconds) to avoid rate limits and improve speed
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
