# 🥗 NutriTrack — AI-Powered Nutritional Health Monitor

> A futuristic, light-themed web application that tracks your daily food intake, visualizes macronutrients in real-time, predicts nutritional values of custom foods using **Google Cloud Gemini AI**, and warns you about health risks based on your diet.

**🔗 Live Demo:** [https://storage.googleapis.com/nutritrack-demo-app-2024/index.html](https://storage.googleapis.com/nutritrack-demo-app-2024/index.html)

---

## ✨ Features

### 🔍 Smart Food Logging
- Search from a built-in database of **50+ Vegetarian and Non-Vegetarian meals** (Indian, Western, Asian cuisine)
- Autocomplete suggestions with real-time calorie previews
- Add any food with a single click or `Enter` key

### 🤖 Gemini AI — Custom Food Auto-Scan
- Type any food not in the database (e.g., *"Deep Fried Mars Bar"*)
- The app automatically calls the **Google Cloud Gemini API** to predict:
  - Calories, Protein, Fat, Carbs, Sugar, Sodium
- No manual entry required — the AI does it all in seconds

### 📊 Live Macronutrient Pie Chart
- Powered by **Chart.js**, the doughnut chart animates in real-time
- Displays exact breakdown of **Protein vs Fat vs Carbohydrates**
- Instantly updates when you add or remove any food

### 📈 Nutrient Progress Bars
- Tracks 6 key nutrients against your daily safe limits:
  - Calories (2000 kcal), Protein (50g), Fat (70g), Carbs (260g), Sugar (50g), Sodium (2300mg)
- Progress bars turn red when you exceed the safe threshold

### ⚠️ Automated Health Alerts
- Dynamic alert cards slide in automatically when any nutrient exceeds its critical limit
- Alerts include specific medical advice and health tips

### 🧬 AI Diet Analysis — Disease Prediction & Alternatives
- Click **"✨ Analyze Diet Risks & Alternatives"** to get a full AI-powered health report
- Powered by Google Cloud Gemini, the report includes:
  - **Predicted disease risks** (e.g., Hypertension, Type 2 Diabetes, Obesity) with specific medical reasoning
  - **Healthier food alternatives** tailored to replace the bad items you logged
- Works on your entire day's logged meals

### 🗑️ Food Removal
- Remove any logged item with a single click
- Totals, chart, and alerts update instantly on removal

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | App structure and semantic layout |
| **CSS3 / Vanilla CSS** | Futuristic light theme, glassmorphism, animations |
| **JavaScript (ES6+)** | Core app logic, state management, API calls |
| **Chart.js** | Interactive doughnut chart for macros |
| **Google Cloud Gemini API** | AI nutrition prediction & diet analysis |
| **Google Cloud Storage** | Static website hosting |

---

## 📁 File Structure

```
AMD promptathon/
├── index.html          # Main app structure and UI
├── style.css           # All styling, animations, theme
├── script.js           # App logic, AI API integration
├── food_database.json  # Local DB with 50+ food items
└── README.md           # This file
```

---

## 🚀 Getting Started (Local)

No build tools or dependencies to install. Just open the file in your browser:

1. **Clone or download** the project folder.
2. Open `index.html` directly in any modern browser (Chrome recommended).
3. The app is ready to use!

> **Note:** The Gemini API key is pre-configured in `script.js`. If you want to use your own key, replace the value of `DEFAULT_TOKEN` on line 5 of `script.js` with your own key from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## ☁️ Deployment (Google Cloud Storage)

This app is deployed as a static website on **Google Cloud Storage**. To re-deploy or update:

```bash
# 1. Set your project
gcloud config set project YOUR_PROJECT_ID

# 2. Upload all files to the bucket
gsutil cp index.html style.css script.js food_database.json gs://nutritrack-demo-app-2024/

# 3. Done! The live URL updates instantly.
```

---

## 🍽️ Food Database

The built-in database includes 50+ items across categories:

**🌿 Vegetarian**
- Paneer Butter Masala, Dal Makhani, Palak Paneer, Chana Masala
- Masala Dosa, Veg Biryani, Chole Bhature, Aloo Paratha
- Tofu Stir Fry, Vegetable Soup, Caesar Salad, and more

**🍗 Non-Vegetarian**
- Butter Chicken, Chicken Biryani, Mutton Rogan Josh
- Grilled Salmon, Beef Steak, Fish and Chips, Sushi
- Prawn Curry, BBQ Ribs, Chicken Tikka, and more

**🍔 Fast Food / Snacks**
- Burger, Pizza, French Fries, Pasta, Noodles, and more

---

## 🔑 API Configuration

This app uses the **Google Gemini 1.5 Flash** model for two features:

1. **Food Nutrition Prediction** — predicts macros for any custom food
2. **Diet Analysis** — full health risk and alternatives report

To get your own API key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Create API key**
3. Replace the value in `script.js` line 5:
```javascript
const DEFAULT_TOKEN = "YOUR_KEY_HERE";
```

---

## 📸 How It Works

```
User types food → Autocomplete search
     ↓ (if not in DB)
AI Auto-Scan triggers → Gemini API called
     ↓
JSON nutritional data returned → Food added to log
     ↓
Dashboard updates → Pie chart animates → Progress bars fill
     ↓ (if limits exceeded)
Health alerts slide in automatically
     ↓ (user clicks Analyze)
Full diet sent to Gemini → Disease risks + Alternatives generated
```

---

## 👤 Author

Built for the **AMD Promptathon** by **Jayant Sharma**

---

## 📄 License

This project is open source and available for educational and demonstration purposes.
