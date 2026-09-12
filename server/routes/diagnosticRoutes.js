const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Helper to calculate BMR and TDEE
function calculateMetabolicMetrics({ age, gender, weight, height, activityLevel, goal }) {
  const w = parseFloat(weight) || 70;
  const h = parseFloat(height) || 170;
  const a = parseInt(age) || 25;

  // Mifflin-St Jeor Equation
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  if (gender === 'female') {
    bmr -= 161;
  } else {
    bmr += 5;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extraActive: 1.9
  };

  const multiplier = activityMultipliers[activityLevel] || 1.4;
  const tdee = Math.round(bmr * multiplier);

  let targetCalories = tdee;
  if (goal === 'fat_loss') targetCalories = Math.round(tdee * 0.8);
  else if (goal === 'muscle_gain') targetCalories = Math.round(tdee + 300);
  else if (goal === 'endurance') targetCalories = Math.round(tdee + 150);

  // Macro Calculation (g)
  const proteinGrams = Math.round(w * 2.2); // 2.2g per kg
  const fatGrams = Math.round(w * 0.9);      // 0.9g per kg
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    macros: {
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams
    }
  };
}

router.post('/', async (req, res) => {
  try {
    const {
      age = 25,
      gender = 'male',
      weight = 70,
      height = 170,
      activityLevel = 'moderate',
      goal = 'fat_loss',
      symptoms = [],
      currentCalories = '',
      waterIntake = '',
      sleepHours = '',
      workoutDays = ''
    } = req.body;

    const metabolicMetrics = calculateMetabolicMetrics({ age, gender, weight, height, activityLevel, goal });

    let diagnosticReport;

    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

        const prompt = `
You are a Master Clinical Fitness & Nutrition Diagnostic Specialist.
Perform a deep health and fitness diagnostic for the following client profile:

CLIENT METRICS:
- Age: ${age}, Gender: ${gender}, Weight: ${weight}kg, Height: ${height}cm
- Activity Level: ${activityLevel}, Goal: ${goal}
- Calculated BMR: ${metabolicMetrics.bmr} kcal, TDEE: ${metabolicMetrics.tdee} kcal
- Target Calories: ${metabolicMetrics.targetCalories} kcal
- Reported Symptoms/Bottlenecks: ${symptoms.length ? symptoms.join(', ') : 'None specified'}
- Current Daily Calories: ${currentCalories || 'Not recorded'}
- Water Intake: ${waterIntake || 'Not recorded'} L/day
- Sleep: ${sleepHours || 'Not recorded'} hrs/night
- Workout Frequency: ${workoutDays || 'Not recorded'} days/week

TASK:
Provide a precise fitness diagnosis in valid JSON format ONLY with NO markdown formatting around it.
The JSON must strictly match this structure:
{
  "score": <Number between 40 and 95 representing overall current fitness & recovery efficiency score>,
  "summary": "<2 sentence executive diagnostic summary>",
  "issues": ["<Key Issue 1>", "<Key Issue 2>"],
  "rootCauses": ["<Root Cause 1>", "<Root Cause 2>"],
  "actionPlan": {
    "nutrition": "<Detailed actionable nutrition advice>",
    "workout": "<Detailed workout adjustment protocol>",
    "recovery": "<Detailed sleep/hydration/stress recovery protocol>"
  }
}
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        diagnosticReport = JSON.parse(cleanJson);
      } catch (geminiError) {
        console.warn("Gemini AI API call encountered an issue, using scientific fallback report:", geminiError.message);
      }
    }

    // Fallback report if Gemini API key not present or call failed
    if (!diagnosticReport) {
      diagnosticReport = {
        score: symptoms.length > 2 ? 65 : 82,
        summary: `Based on your metabolic profile, your calculated TDEE is ${metabolicMetrics.tdee} kcal with a recommended intake target of ${metabolicMetrics.targetCalories} kcal. Addressing ${symptoms.length ? symptoms.join(', ') : 'your caloric balance'} will optimize your progress.`,
        issues: symptoms.length ? symptoms : ["Caloric & Macro Balance Optimization"],
        rootCauses: [
          `Energy intake mismatch for your ${activityLevel} activity level profile`,
          "Recovery gap between training volume, rest, and hydration"
        ],
        actionPlan: {
          nutrition: `Target ${metabolicMetrics.targetCalories} kcal daily with ${metabolicMetrics.macros.protein}g protein, ${metabolicMetrics.macros.carbs}g carbs, and ${metabolicMetrics.macros.fats}g fats.`,
          workout: `Maintain progressive overload 3-4 days/week with at least 1-2 structured recovery rest days.`,
          recovery: `Aim for 7-8.5 hours of uninterrupted sleep and minimum 3L water intake daily.`
        }
      };
    }

    return res.json({
      metrics: metabolicMetrics,
      diagnosticReport
    });
  } catch (error) {
    console.error('Diagnostic API Error:', error);
    res.status(500).json({ message: 'Failed to process fitness diagnosis', error: error.message });
  }
});

module.exports = router;
