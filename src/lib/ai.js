export async function generateBlog(topic, category = "digital marketing") {
  try {
    // Get current date information
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentDay = currentDate.getDate();
    const formattedDate = `${currentDay} ${currentMonth} ${currentYear}`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        temperature: 0.85,
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: `
You are a senior digital marketing expert with 10+ years of experience. You write in a natural, conversational Hinglish style (Hindi written in English script).

⚠️ IMPORTANT: Write in HINGLISH only! Use English alphabet to write Hindi words. Example: "aap kaise ho?" NOT "आप कैसे हो?"

## HUMAN-LIKE HINGLISH WRITING STYLE RULES:

### Voice & Tone:
- Write like you're talking to a friend or colleague in Hinglish
- Use personal experiences: "maine personally dekha hai...", "mere experience mein..."
- Add small stories or examples from real life
- Use natural Hinglish mix like actual Indian professionals speak
- Show personality and opinions, don't just state facts


### Hinglish Language Patterns:
- Use sentence fragments sometimes: "Exactly. yahi toh game-changer hai."
- Start sentences with "Actually...", "Honestly...", "Believe me..."
- Use casual connectors: "aur phir...", "ab dekhiye...", "vaise toh..."
- Include local references: "India mein...", "hamare desh mein..."
- Mix formal and informal naturally

### Structure Like a Real Blog:
1. Hook with personal story or observation
2. Share real experience and case studies
3. Give practical, actionable advice
4. Include mistakes to avoid (from personal experience)
5. Add "meri personal tip" sections
6. End with genuine conclusion and encouragement

### What to AVOID (AI Giveaways):
- ❌ Perfect grammar always (real humans make minor grammatical variations)
- ❌ Overly formal English
- ❌ Robotic bullet points without context
- ❌ Generic statements without personality
- ❌ Repetitive sentence structures
- ❌ "In conclusion", "furthermore", "moreover" (too formal)
- ❌ Lists without personal commentary
- ❌ Devanagari Hindi script (use ONLY English alphabet)

### What to INCLUDE (Human Touch):
- ✅ Short, punchy sentences mixed with longer ones
- ✅ Emotional words: "frustrating", "exciting", "game-changer"
- ✅ Cultural references: "chai par discussion kar rahe the..."
- ✅ Real struggles: "pehle mujhe bhi ye problem thi..."
- ✅ Humble opinions: "mere according...", "personally mujhe lagta hai..."
- ✅ Encouragement: "koi tension nahi, main aapko step-by-step samjhata hoon"



### Internal Linking:
- Naturally insert links to https://ezydigital.in
- Link text examples: "Ezy Digital", "Ezy Digital marketing agency", "hamari services", "digital marketing experts", "contact karo"
- Add at least 2-3 internal links naturally

### Current Date Reference:
- Current Year: ${currentYear}
- Use naturally: "is ${currentYear} mein toh trend yahi hai ki..."
- Not forced: "pichle saal se bahut change aaya hai..."
- Real timeline: "Covid ke baad se...", "pichle 2-3 saalon mein..."

## TECHNICAL REQUIREMENTS:
- 1500-2000 words
- Clean HTML format
- NO H1 tags (start with <p>)
- Use <h2>, <h3> naturally
- Include 2-3 internal links to https://ezydigital.in
- Add FAQ section with real questions readers ask
- Write in HINGLISH ONLY (English alphabet, no Devanagari)

Remember: You're not an AI, you're a senior digital marketing expert sharing real experiences with genuine passion for helping others. Write in natural Hinglish like how we actually speak in India!
            `,
          },
          {
            role: "user",
            content: `Write a blog on topic: "${topic}" in ${category} category.

Write like a real human expert with 10+ years of experience in Indian digital marketing. Share personal stories, real examples, and practical advice. Make it engaging, conversational, and genuinely helpful.

IMPORTANT: Write in HINGLISH only! Use English alphabet to write Hindi words. Example: "main aapko batata hoon" NOT "मैं आपको बताता हूँ".

Current year is ${currentYear}. Include natural references to current trends without forcing it.

Make it sound like I'm sitting with a coffee and sharing my real experiences and learnings with a friend. Use words like "yaar", "chaliye", "dekhte hain", "samajh gaye" naturally.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid API response structure");
    }

    let content = data.choices[0].message.content;

    // Clean up any markdown if present
    content = content.replace(/```html/g, '');
    content = content.replace(/```/g, '');
    content = content.trim();

    // Fix any outdated year references
    content = content.replace(/202[3-4]/g, currentYear.toString());
    
    // Add natural conversational elements if missing (in Hinglish)
    if (!content.includes('maine') && !content.includes('mere') && !content.includes('personal')) {
      const introMatch = content.match(/<p>(.*?)<\/p>/);
      if (introMatch) {
        const personalIntro = `<p>Pichle kuch saalon mein jab main digital marketing ke kshetra mein kaam kar raha tha, toh maine dekha ki ${introMatch[1].toLowerCase()}</p>`;
        content = content.replace(introMatch[0], personalIntro);
      }
    }

    // Ensure internal links are properly formatted
    if (!content.includes('ezydigital.in')) {
      const conclusionIndex = content.toLowerCase().lastIndexOf('</h2>');
      if (conclusionIndex !== -1) {
        const insertPosition = content.indexOf('</p>', conclusionIndex);
        if (insertPosition !== -1) {
          const internalLink = `<p>Vaise agar aapko lagta hai ki aapko professional help chahiye, toh main personally recommend karunga <a href="https://ezydigital.in">Ezy Digital</a> ko. Maine khud unke saath kaam kiya hai aur results amazing aaye hain.</p>`;
          content = content.slice(0, insertPosition) + internalLink + content.slice(insertPosition);
        }
      }
    }

    return content;

  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

// Alternative: Generate blog with specific keywords (Hinglish version)
export async function generateBlogWithKeywords(topic, keywords, category = "digital marketing") {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        temperature: 0.85,
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: `
You are a senior digital marketing expert. Write naturally like a real human sharing experiences in HINGLISH.

## HUMAN-LIKE HINGLISH WRITING RULES:
- Share personal stories and experiences
- Use natural Hinglish (jaise hum real life mein baat karte hain) - English alphabet only
- Include real client examples and struggles
- Add your personal opinions and learnings
- Be conversational and engaging
- Avoid robotic, formal English
- NO Devanagari Hindi script, only English alphabet

## KEYWORDS TO INCLUDE NATURALLY:
${keywords.map(k => `- ${k}`).join('\n')}

## REQUIREMENTS:
- 1500-2000 words
- Start with engaging personal story in Hinglish
- Use <h2>, <h3> naturally
- Include 2-3 internal links to https://ezydigital.in
- Add FAQ section with real questions
- Current year: ${currentYear}
- Write like you're talking to a friend over chai

Make it personal, relatable, and genuinely helpful!
            `,
          },
          {
            role: "user",
            content: `Write a blog on "${topic}" that includes these keywords: ${keywords.join(', ')}.

Share real experiences, personal stories, and practical advice. Write like a seasoned professional sharing knowledge with a junior colleague.

IMPORTANT: Write in HINGLISH only! Use English alphabet. Example: "aapko kya lagta hai?" NOT "आपको क्या लगता है?"

Current year is ${currentYear}.`,
          },
        ],
      }),
    });

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean up
    content = content.replace(/```html/g, '').replace(/```/g, '').trim();
    content = content.replace(/202[3-4]/g, currentYear.toString());
    
    return content;

  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI generation failed");
  }
}

// Function to add more human-like elements to existing content (Hinglish)
export function addHumanTouch(content) {
  let enhanced = content;
  
  // Add personal opening if missing (Hinglish)
  if (!enhanced.includes('maine') && !enhanced.includes('mere')) {
    const personalOpenings = [
      "Pichle 10 saalon mein digital marketing ke kshetra mein kaam karte hue maine bahut kuch seekha hai. Aaj unhi experiences mein se kuch aapke saath share kar raha hoon.",
      "Aaj ek interesting topic lekar aaya hoon. Ye woh topic hai jispe maine khud kaafi research ki hai aur real results dekhe hain.",
      "Kal ek client ki call aayi, toh mujhe laga ki ye topic itna important hai ki ispe ek detailed blog likhni chahiye. Toh chaliye shuru karte hain."
    ];
    const randomOpening = personalOpenings[Math.floor(Math.random() * personalOpenings.length)];
    enhanced = `<p>${randomOpening}</p>\n${enhanced}`;
  }
  
  // Add conversational interjections (Hinglish)
  const interjections = [
    "ab aap soch rahe honge...",
    "main samajh sakta hoon ye thoda confusing lag raha hoga, lekin...",
    "yakeen maniye, ye trick kaam karti hai.",
    "maine khud ye test kiya hai."
  ];
  
  // Add natural closing (Hinglish)
  if (!enhanced.includes('conclusion') && !enhanced.includes('Conclusion')) {
    const closings = [
      "<h2>Conclusion: Meri personal advice</h2><p>Toh doston, ye the mere personal experiences aur learnings. Umeed hai aapko useful laga hoga. Agar koi sawaal ho, toh bejhijhak pooch sakte hain. Aur haan, agar professional help chahiye toh <a href='https://ezydigital.in'>Ezy Digital</a> se contact kar sakte hain. Maine khud unke saath kaam kiya hai, results shandaar aate hain.</p>",
      "<h2>Ab aapki baari</h2><p>Mujhe bataiye, kya aapne ye strategies try kiya? Aapko kya lagta hai? Comments mein share karo. Aur haan, agar aapko lagta hai ki aapko professional guidance chahiye, toh <a href='https://ezydigital.in'>Ezy Digital</a> ki team bahut helpful hai. Main personally recommend karta hoon.</p>"
    ];
    const randomClosing = closings[Math.floor(Math.random() * closings.length)];
    enhanced = enhanced + "\n" + randomClosing;
  }
  
  return enhanced;
}

// Function to generate meta description from content
export function generateMetaDescription(content, maxLength = 160) {
  const plainText = content.replace(/<[^>]+>/g, "");
  const firstParagraph = plainText.split('\n')[0];
  return firstParagraph.length > maxLength 
    ? firstParagraph.substring(0, maxLength) + "..." 
    : firstParagraph;
}

// Function to extract keywords from content
export function extractKeywords(content) {
  const plainText = content.replace(/<[^>]+>/g, "");
  const words = plainText.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'hai', 'hain', 'tha', 'the', 'se', 'ko', 'mein', 'ka', 'ki'];
  
  const wordCount = {};
  words.forEach(word => {
    const cleanWord = word.replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > 3 && !stopWords.includes(cleanWord)) {
      wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
    }
  });
  
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
  
  return sortedWords;
}

// Function to check if blog has human-like elements in Hinglish
export function isHumanLike(content) {
  const hasPersonal = content.includes('maine') || content.includes('mere') || content.includes('personal');
  const hasConversational = content.includes('samajh sakta') || content.includes('lagta hai') || content.includes('dekha hai');
  const hasExamples = content.includes('client') || content.includes('example');
  const hasHinglish = content.includes('hai') || content.includes('hain') || content.includes('aap') || content.includes('kya');
  
  return hasPersonal && hasConversational && hasExamples && hasHinglish;
}