const workouts = [
  {
    name: "Full Body Quick Burn",
    exercises: [
      { name: "Jumping Jacks", guide: "Stand upright with legs together, arms at your sides. Jump while spreading your legs and arms, then return to start." },
      { name: "Bodyweight Squats", guide: "Keep your feet shoulder-width apart and lower down as if sitting back into a chair." },
      { name: "Push-ups", guide: "Keep your body in a straight line and lower until your chest nearly touches the floor." },
      { name: "Plank (30 sec)", guide: "Hold your body in a straight line on your forearms and toes." },
      { name: "Lunges", guide: "Step forward with one leg and lower your hips until both knees are bent at about 90°." }
    ]
  },
  {
    name: "Core Crusher",
    exercises: [
      { name: "Russian Twists", guide: "Sit with knees bent, lean back slightly, and twist your torso from side to side." },
      { name: "Leg Raises", guide: "Lie flat and lift your legs until they’re perpendicular to the floor." },
      { name: "Plank (30 sec)", guide: "Engage your core and hold steady." },
      { name: "Bicycle Crunches", guide: "Alternate touching your elbows to opposite knees in a pedaling motion." },
      { name: "Mountain Climbers", guide: "From a plank, drive your knees alternately toward your chest." }
    ]
  },
  {
    name: "Cardio Blast",
    exercises: [
      { name: "Jumping Jacks", guide: "Keep your movements controlled; land softly on your feet." },
      { name: "High Knees", guide: "Run in place, lifting your knees up to hip height." },
      { name: "Burpees", guide: "Start standing, drop to a squat, kick feet back, do a push-up, jump up explosively." },
      { name: "Butt Kicks", guide: "Run in place kicking your heels toward your glutes." },
      { name: "Rest (30 sec)", guide: "Catch your breath and drink water." }
    ]
  },
  {
    name: "Upper Body Strength",
    exercises: [
      { name: "Push-ups", guide: "Hands shoulder-width apart, lower and push back up." },
      { name: "Shoulder Taps", guide: "From a plank, tap each shoulder with the opposite hand, keeping hips steady." },
      { name: "Tricep Dips", guide: "Use a chair, lower yourself by bending elbows, and push back up." },
      { name: "Arm Circles", guide: "Extend arms and make small circles forward and backward." },
      { name: "Rest (30 sec)", guide: "Breathe deeply to recover." }
    ]
  },
  {
    name: "Lower Body Focus",
    exercises: [
      { name: "Squats", guide: "Keep knees behind toes, chest up, and push through your heels." },
      { name: "Lunges", guide: "Alternate legs and maintain balance by keeping your torso upright." },
      { name: "Calf Raises", guide: "Stand tall, lift heels off the ground, then lower slowly." },
      { name: "Wall Sit", guide: "Slide down a wall until knees are at 90°, hold for 30 seconds." },
      { name: "Jump Squats", guide: "Explode upward from a squat position and land softly." }
    ]
  }
];

const generateBtn = document.getElementById("generateWorkout");
const markDoneBtn = document.getElementById("markDone");
const workoutDisplay = document.getElementById("workoutDisplay");
const progressDisplay = document.getElementById("progressDisplay");
const resetBtn = document.getElementById("resetProgress");

let currentWorkout = null;

// Load progress on startup
document.addEventListener("DOMContentLoaded", loadProgress);

generateBtn.addEventListener("click", () => {
  const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
  currentWorkout = randomWorkout;

  workoutDisplay.innerHTML = `
    <h2>${randomWorkout.name}</h2>
    <ul>
      ${randomWorkout.exercises.map(ex => `
        <li>
          <strong>${ex.name}</strong><br>
          <span class="guide">${ex.guide}</span>
        </li>
      `).join("")}
    </ul>
  `;

  markDoneBtn.classList.remove("hidden");
});

markDoneBtn.addEventListener("click", () => {
  if (!currentWorkout) return;

  const progress = JSON.parse(localStorage.getItem("homefitProgress")) || [];
  const date = new Date().toLocaleDateString();
  progress.push({ date, workout: currentWorkout.name });

  localStorage.setItem("homefitProgress", JSON.stringify(progress));
  currentWorkout = null;
  markDoneBtn.classList.add("hidden");
  workoutDisplay.innerHTML = "<p>💪 Great job! Workout saved!</p>";

  loadProgress();
});

function loadProgress() {
  const progress = JSON.parse(localStorage.getItem("homefitProgress")) || [];
  if (progress.length === 0) {
    progressDisplay.innerHTML = "<p>No workouts yet. Start today!</p>";
    return;
  }

  progressDisplay.innerHTML = progress
    .map(
      (p, i) =>
        `<div class="progress-entry">${i + 1}. ${p.date}: ${p.workout}</div>`
    )
    .join("");
}

resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your progress?")) {
    localStorage.removeItem("homefitProgress");
    loadProgress();
  }
});
