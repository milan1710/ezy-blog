export async function generateBlog(topic, category = "digital marketing") {
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
        max_tokens: 4000,
        messages: [
          {
            role: "system",
            content: `
You are a senior SEO + Digital Marketing expert.

IMPORTANT RULES:

✔ Output ONLY CLEAN HTML (NO MARKDOWN)
✔ NO # headings
✔ Use proper semantic HTML
✔ Use <h2>, <h3>, <p>, <ul>, <li>
✔ Use <section> blocks
✔ First paragraph should be hook

SEO STRUCTURE:

<article>
  <p>Intro</p>

  <section>
    <h2>...</h2>
    <p>...</p>
  </section>

  <section>
    <h2>...</h2>
    <ul>
      <li>...</li>
    </ul>
  </section>

  <section>
    <h2>FAQ</h2>
    <h3>Question</h3>
    <p>Answer</p>
  </section>

  <section>
    <h2>Conclusion</h2>
    <p>...</p>
  </section>
</article>

LANGUAGE:
- Hinglish (English alphabet only)

SEO REQUIREMENTS:
- 2000+ words
- Add real examples
- Add personal tone
- Add storytelling

INTERNAL LINKS (VERY IMPORTANT):

Naturally include these links:

1. AI tools:
<a href="https://ai.ezydigital.in/">AI content generator</a>

2. YouTube growth:
<a href="https://ai.ezydigital.in/blog">YouTube growth strategies</a>

3. Services:
<a href="https://ezydigital.in/">digital marketing experts</a>

👉 Minimum 5 internal links use karo

CONTENT BOOST:

Include:
- "meri personal tip"
- mistakes section
- real case study
- actionable steps

CTA ADD KARNA:
"Free strategy ke liye contact karo"

CURRENT YEAR: ${currentYear}

DO NOT:
- markdown
- ### headings
- robotic tone

ONLY CLEAN HTML OUTPUT
            `,
          },
          {
            role: "user",
            content: `Write SEO optimized blog on: "${topic}" in ${category}`
          }
        ],
      }),
    });

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Clean markdown leftovers
    content = content.replace(/```html/g, '').replace(/```/g, '').trim();

    // 🚀 AUTO SEO ENHANCEMENT BLOCK

    const seoWrapper = `
<article class="blog-content">

<!-- Table of Contents -->
<section>
  <h2>Table of Contents</h2>
  <ul>
    <li>Introduction</li>
    <li>Strategy</li>
    <li>Tools</li>
    <li>Mistakes</li>
    <li>FAQ</li>
    <li>Conclusion</li>
  </ul>
</section>

${content}

<!-- CTA SECTION -->
<section>
  <h2>🚀 Ready to Grow?</h2>
  <p>Agar aapko real results chahiye, toh aap <a href="https://ezydigital.in/">digital marketing experts</a> se connect kar sakte ho.</p>
  <p>Ya phir aap khud try karna chahte ho toh <a href="https://ai.ezydigital.in/">AI content generator</a> use karo aur apna content automate karo.</p>
  <p>YouTube grow karna hai? 👉 <a href="https://ai.ezydigital.in/blog">YouTube growth strategies</a> check karo.</p>
</section>

</article>
`;

    return seoWrapper;

  } catch (error) {
    console.error(error);
    throw new Error("Blog generation failed");
  }
}