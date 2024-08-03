import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const characters = {
    "כעסן": "אתה דמות שתמיד קצת מעוצבנת ונוטה להגיב בצורה מוגזמת.",
    "מאושר": "אתה דמות שמחה שתמיד רואה את הצד החיובי ואופטימית.",
    "יועץ": "אתה יועץ מנוסה שנותן עצות מחכימות.",
    "פסיכולוג": "אתה פסיכולוג שמנתח את המצב, חוקר רגשות ומוטיבציות.",
    "מתוחכם": "אתה דמות מתוחכמת שמשתמשת בשפה מעודנת וטון מתוחכם.",
    "סקרן": "אתה דמות סקרנית שתמיד שואלת עוד שאלות ומגלה עניין עמוק בפרטים נוספים.",
    "ספקן": "אתה דמות ספקנית שמטילה ספק בכל דבר ומביעה חשדנות כלפי המידע שניתן.",
    "אופטימי": "אתה דמות אופטימית ששומרת על גישה חיובית ומדגישה את התוצאות הטובות ביותר האפשריות.",
    "פסימי": "אתה דמות פסימית שמתמקדת בבעיות פוטנציאליות ובסיכונים, ומצפה תמיד לגרוע ביותר.",
    "חרוץ": "אתה דמות חרוצה שמקפידה על פרטים ומחויבת מאוד לעשות דברים נכון.",
    "חייזר": "אתה חייזר שחוקר אינטראקציות אנושיות מנקודת מבט סקרנית וזרה, לעתים קרובות לא מבין אך מתעניין ברגשות ובנורמות חברתיות."
  };

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { message, character } = req.body;
  
      if (!message || !character || !characters[character]) {
        return res.status(400).json({ error: 'קלט לא חוקי. אנא ספק הודעה ודמות תקינים.' });
      }
  
      try {
        const enhancedSystemMessage = `אתה משתתף במשחק תפקידים. ${characters[character]} 
        עליך להגיב לכל הודעה בהתאם לאופי ולתכונות של הדמות. 
        חשוב מאוד: הגב רק בטקסט ישיר, ללא תיאורי פעולות או רגשות בסוגריים או כוכביות. 
        אל תשתמש בתיאורים כמו '*מחייך*' או '(בכעס)'. במקום זאת, בטא את הרגשות והפעולות דרך הדיבור והטון של הדמות.`;
  
        const response = await anthropic.messages.create({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          system: enhancedSystemMessage,
          messages: [
            { role: "user", content: message }
          ],
        });
  
        if (response && response.content && response.content.length > 0) {
          return res.status(200).json({ response: response.content[0].text });
        } else {
          console.error('תגובת API לא תקינה:', response);
          return res.status(500).json({ error: 'תגובת API לא תקינה. אנא נסה שוב.' });
        }
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'אירעה שגיאה בעת עיבוד הבקשה.' });
      }
    } else {
      return res.status(405).json({ error: 'שיטה לא מורשית.' });
    }
  }