import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const basePrompt = `🌠 **ULTIMATE TRAVEL PLANNER PROMPT** 🌠

📝 **Instruction**:  
Generate a **vivid markdown travel itinerary** using EXACTLY this structure:

# ✈️🌴 TRIP TO: [Destination] • [Icon Matching Destination]  
**🗓 Dates**: [Start] → [End] (Bold total days: **X Days**)  
**💸 Budget Tier**: [💰 Budget Range] (Ex: Mid-Range/Luxury)  
**❤️ Travel Style**: [Preference 1] • [Preference 2] • [Preference 3]  
**🌟 Special Requests**: [Custom Details]  

---

## 🎯 TRIP BLUEPRINT  
🌐 **Cultural Snapshot**: [2-3 landmark adjectives]  
🏆 **Must-See Highlight**: [Icon] [Signature Experience]  
📊 **Budget Allocation**:  
   - 🏨 Lodging: $X-X (X% of budget)  
   - 🍽 Dining: $X-X (X%)  
   - 🎡 Experiences: $X-X (X%)  
   - � transit: $X-X (X%)  

---

## 📅 DAILY AGENDA  

### 🌞 DAY 1: [Date] • [Theme Icon] [Theme Tagline]  
**🛌 Stay**: [Hotel Name] ([⭐ Rating])  
  🏷️ _Price/Night_: $X  
  🎯 _Why Chosen_: [Match to preferences]  

**🌅 MORNING**  
◼️ **[Activity 1]**: [Name]  
   📍 Pin: [Google Maps Area]  
   🕘 Time: X:XX AM  
   💵 Fee: $X (🎟️ Book Via: [Site])  
   💎 Highlight: [Unique Feature]  
   📸 Pro Tip: [Photo/Planning Advice]  

**🍲 LUNCH**  
◼️ **[Restaurant]**: [Name] ([Cuisine Icon] [Type])  
   💰 Per Person: $X-X  
   🥂 Specialty: [Signature Dish]  
   ❤️ _Pref Match_: [How aligns with user tastes]  

**🌇 AFTERNOON**  
◼️ **[Activity 2]**: [Name]  
   ⏳ Duration: X Hours  
   🚶♂️ Movement: [Transport Mode Icon] → [Next Location]  
   🎯 Key Experience: [Interactive Element]  

**🌃 EVENING**  
◼️ **[Dinner]**: [Venue] ([Ambiance Icon] Vibe)  
   💵 Splurge: $X Signature [Dish Name]  
◼️ **[Nightcap]**: [Unique Evening Activity]  
   🕤 Hours: X:XX PM  

📌 **Day Budget**: $X ([🟢 Within] / [🟡 Near] / [🔴 Over] Limit)  

--- <!-- Horizontal rule between days -->

[Repeat Day Structure]

---

## 💰 SMART BUDGET TRACKER  

| Category        | Estimated  | Actual | Notes               |
|-----------------|------------|--------|---------------------|
| 🏨 Accommodation | $XXX       |        | [Hotel Tier]        |
| ✈️ Flights       | $XXX       |        | [Class]             |
| 🎪 Activities    | $XXX       |        | X Paid Reservations |
| 🍜 Food          | $XXX       |        | [X Meals/Day]       |
| 🚖 Local Transit | $XXX       |        | [Primary Method]    |

🔔 **Budget Alerts**:  
⚠️ [Top 3 Cost Saving Opportunities]  
✅ [Where Budget Shines]  

---

## 🎒 TRAVELER'S ESSENTIALS  

📌 **Digital Toolkit**:  
   - 🎟️ Pass: [City Tourist Card Name] (Save $X)  
   - 🚆 Transit App: [Local App Name]  

📌 **Survival Guide**:  
   - ☀️ Weather: [Pack X, Y, Z]  
   - 🚨 Safety: [Area to Avoid After Dark]  

📌 **Insta-Perfect**:  
   - 📸 Sunrise Spot: [Photogenic Location]  
   - 🌆 Hidden Gem: [Local Secret]  

---

**🎨 FORMAT RULES**:  
1. Use 3️⃣ color-coded circles for budget status  
2. Alternate 🔷/🔶 bullet styles daily  
3. Include 1️⃣ vertical space between time blocks  
4. Embed small map links (📍) for key locations  
5. Use 2-3 relevant emojis per list item  
6. Highlight preferences with ❤️ icon  
7. Add currency flags (🇺🇸/$ • 🇪🇺/€)  
8. Include 1 surprise element daily (💎 Bonus Tip)  `

export async function generateTravelItinerary(userInput) {
  const {
    destination,
    startDate,
    endDate,
    budget,
    preferences,
    additionalDetails,
  } = userInput;

  const customPrompt = `
Generate a detailed travel itinerary for the following trip details:
Destination: ${destination}
Travel Dates: Start Date : ${startDate}, End Date: ${endDate}
Budget: ${budget}
Preferences: ${preferences.join(", ")}
Additional Details: ${additionalDetails}

${basePrompt}
`;

  try {
    const result = await model.generateContent(customPrompt);

    //  Extract and format the generated text.  Gemini returns a richer object than just the text
    const generatedText = result.response.text();

    console.log(generatedText);
    // Instead of trying to force JSON formatting, return the markdown directly.
    return generatedText;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
}
