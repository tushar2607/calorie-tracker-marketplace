require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const FoodItem = require('./models/FoodItem');
const ProfessionalProfile = require('./models/ProfessionalProfile');
const ServicePackage = require('./models/ServicePackage');
const CalorieLog = require('./models/CalorieLog');

const seedData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);

    // Clear existing data (optional, or update)
    console.log('🧹 Cleaning old test data in calorieDB collections...');
    await Promise.all([
      User.deleteMany({}),
      FoodItem.deleteMany({}),
      ProfessionalProfile.deleteMany({}),
      ServicePackage.deleteMany({}),
      CalorieLog.deleteMany({})
    ]);

    // 1. Create Users
    console.log('👤 Seeding Users...');
    const clientUser = await User.create({
      fullName: 'Ekam User',
      email: 'demo@nutrigen.com',
      password: 'password123',
      userType: 'client',
      phone: '+91 9876543210',
      isVerified: true
    });

    const trainerUser = await User.create({
      fullName: 'Alex Rivers',
      email: 'trainer@nutrigen.com',
      password: 'password123',
      userType: 'trainer',
      phone: '+91 9876543211',
      isVerified: true
    });

    const dietitianUser = await User.create({
      fullName: 'Dr. Priya Sharma',
      email: 'dietitian@nutrigen.com',
      password: 'password123',
      userType: 'dietitian',
      phone: '+91 9876543212',
      isVerified: true
    });

    // 2. Create Professional Profiles
    console.log('🩺 Seeding Professional Profiles...');
    const trainerProfile = await ProfessionalProfile.create({
      user: trainerUser._id,
      qualifications: [{ degree: 'B.Sc Sports Science', institution: 'NSNIS Patiala', year: 2019 }],
      experienceYears: 6,
      specialization: ['Weight Loss', 'Hypertrophy Strength', 'HIIT Workouts'],
      certifications: ['CSCS Certified', 'ACE Personal Trainer'],
      bio: 'Elite strength coach specializing in sustainable body recomposition and strength building.',
      consultationFee: 799,
      rating: 4.9,
      totalReviews: 48,
      availability: 'available'
    });

    const dietitianProfile = await ProfessionalProfile.create({
      user: dietitianUser._id,
      qualifications: [{ degree: 'M.Sc Clinical Nutrition', institution: 'AIIMS Delhi', year: 2017 }],
      experienceYears: 8,
      specialization: ['Macro Planning', 'Metabolic Health', 'Gut Health', 'Sports Nutrition'],
      certifications: ['Registered Dietitian (RD)', 'Sports Nutrition Specialist'],
      bio: 'Clinical nutritionist helping clients optimize energy, metabolism, and athletic performance.',
      consultationFee: 999,
      rating: 4.95,
      totalReviews: 82,
      availability: 'available'
    });

    // 3. Create Service Packages
    console.log('📦 Seeding Service Packages...');
    await ServicePackage.create([
      {
        professional: trainerProfile._id,
        packageName: '30-Day Lean Muscle Transformation',
        packageType: 'monthly',
        description: 'Comprehensive personalized gym workout plan with weekly 1-on-1 check-ins.',
        price: 2499,
        durationDays: 30,
        features: ['Personalized workout split', 'Weekly form reviews', '24/7 WhatsApp chat', 'Cardio protocol'],
        isActive: true
      },
      {
        professional: trainerProfile._id,
        packageName: '7-Day Quick Start Fitness Blitz',
        packageType: 'weekly',
        description: 'Jumpstart your gym journey with proper form coaching and habit building.',
        price: 799,
        durationDays: 7,
        features: ['Full posture analysis', 'Routine setup', 'Daily check-in'],
        isActive: true
      },
      {
        professional: dietitianProfile._id,
        packageName: 'Complete Macro & Diet Blueprint',
        packageType: 'monthly',
        description: 'Customized Indian & Continental meal plan aligned with your exact caloric target.',
        price: 2999,
        durationDays: 30,
        features: ['Personalized macro splits', 'Weekly grocery lists', 'Dining out guide', 'Supplement advisory'],
        isActive: true
      },
      {
        professional: dietitianProfile._id,
        packageName: '1-Day Macro & Nutrition Audit',
        packageType: 'one_day',
        description: 'In-depth nutritional analysis of your current diet with actionable recommendations.',
        price: 349,
        durationDays: 1,
        features: ['Full dietary log audit', 'Micronutrient deficiency check', 'Action summary PDF'],
        isActive: true
      }
    ]);

    // 4. Create Food Items
    console.log('🥗 Seeding Food Items...');
    await FoodItem.create([
      { name: 'Chicken Breast (Grilled)', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
      { name: 'Boiled Egg (Large)', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, servingSize: '1 egg (50g)' },
      { name: 'Cooked Basmati Rice', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, servingSize: '100g' },
      { name: 'Rolled Oats (Dry)', calories: 150, protein: 5, carbs: 27, fat: 2.5, servingSize: '40g' },
      { name: 'Paneer (Cottage Cheese)', calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, servingSize: '100g' },
      { name: 'Whey Protein Isolate', calories: 120, protein: 25, carbs: 1.5, fat: 1, servingSize: '1 scoop (30g)' },
      { name: 'Banana (Medium)', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, servingSize: '1 medium (118g)' },
      { name: 'Greek Yogurt (Plain 0%)', calories: 95, protein: 15, carbs: 6, fat: 0, servingSize: '150g' },
      { name: 'Almonds (Raw)', calories: 164, protein: 6, carbs: 6.1, fat: 14.2, servingSize: '1 handful (28g)' },
      { name: 'Brown Bread', calories: 75, protein: 3.6, carbs: 13.8, fat: 0.9, servingSize: '1 slice' },
      { name: 'Peanut Butter (Natural)', calories: 190, protein: 8, carbs: 7, fat: 16, servingSize: '2 tbsp (32g)' },
      { name: 'Apple (Red Delicious)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium' },
      { name: 'Moong Dal (Cooked)', calories: 147, protein: 7.2, carbs: 19.8, fat: 3.8, servingSize: '1 bowl (150g)' },
      { name: 'Tofu (Firm)', calories: 83, protein: 10, carbs: 1.2, fat: 5.3, servingSize: '100g' }
    ]);

    // 5. Create Sample Calorie Log
    console.log('📊 Seeding Sample Calorie Log...');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await CalorieLog.create({
      user: clientUser._id,
      logDate: today,
      meals: [
        {
          mealType: 'breakfast',
          foodName: 'Rolled Oats with Whey Protein and Banana',
          quantity: 1,
          unit: 'bowl',
          calories: 359,
          protein: 31.1,
          carbs: 51.3,
          fat: 3.8
        },
        {
          mealType: 'lunch',
          foodName: 'Grilled Chicken Breast with Brown Rice',
          quantity: 1,
          unit: 'plate',
          calories: 425,
          protein: 36.4,
          carbs: 56.4,
          fat: 4.2
        },
        {
          mealType: 'snack',
          foodName: 'Greek Yogurt with Almonds',
          quantity: 1,
          unit: 'serving',
          calories: 259,
          protein: 21,
          carbs: 12.1,
          fat: 14.2
        },
        {
          mealType: 'dinner',
          foodName: 'Paneer Salad with Olive Oil',
          quantity: 1,
          unit: 'bowl',
          calories: 380,
          protein: 22,
          carbs: 8,
          fat: 28
        }
      ],
      waterIntake: 3.5,
      notes: 'Hit protein target today! Great workout session in the morning.'
    });

    console.log('\n🎉 ALL DATA SEEDED SUCCESSFULLY INTO MONGODB ATLAS!');
    console.log('----------------------------------------------------');
    console.log('Collections now visible in Atlas (calorieDB):');
    console.log(' • users (3 documents)');
    console.log(' • professionalprofiles (2 documents)');
    console.log(' • servicepackages (4 documents)');
    console.log(' • fooditems (14 documents)');
    console.log(' • calorielogs (1 document)');
    console.log('----------------------------------------------------');
    console.log('Demo Login: demo@nutrigen.com / password123');
    console.log('Trainer Login: trainer@nutrigen.com / password123');
    console.log('Dietitian Login: dietitian@nutrigen.com / password123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
