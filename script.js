const workouts = [
  {
    name: "Full Body Quick Burn",
    exercises: [
      "20 Jumping Jacks",
      "15 Bodyweight Squats",
      "10 Push-ups",
      "30-second Plank",
      "15 Lunges (each leg)"
    ]
  },
  {
    name: "Core Crusher",
    exercises: [
      "20 Russian Twists",
      "15 Leg Raises",
      "30-second Plank",
      "20 Bicycle Crunches",
      "15 Mountain Climbers"
    ]
  },
  {
    name: "Cardio Blast",
    exercises: [
      "30 Jumping Jacks",
      "20 High Knees",
      "10 Burpees",
      "20 Butt Kicks",
      "30-second Rest and Repeat"
    ]
  },
  {
    name: "Upper Body Strength",
    exercises: [
      "10 Push-ups",
      "15 Shoulder Taps",
      "10 Tricep Dips (on a chair)",
      "20 Arm Circles",
      "30-second Rest"
    ]
  },
  {
    name: "Lower Body Focus",
    exercises: [
      "15 Squats",
      "15 Lunges (each leg)",
      "20 Calf Raises",
      "30-second Wall Sit",
      "10 Jump Squats"
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
      ${randomWorkout.exercises.map(ex => `<li>${ex}</li>`).join("")}
    </ul>
  `;

  markDoneBtn.classList.remove("hidden");
});

// Save progress when workout completed
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

// Display saved progress
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

// Reset all progress
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your progress?")) {
    localStorage.removeItem("homefitProgress");
    loadProgress();
  }
});
