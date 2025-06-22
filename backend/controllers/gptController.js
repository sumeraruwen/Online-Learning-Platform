const axios = require('axios');

let requestCount = 0;
const MAX_REQUESTS = 250;

exports.getCourseRecommendations = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  if (requestCount >= MAX_REQUESTS) {
    return res.status(429).json({ message: 'API request limit reached' });
  }

  try {
    requestCount++;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices[0].message.content;
    res.status(200).json({ response: result });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'GPT API request failed' });
  }
};
