const habits = [
    "Read habits note",
    "Apply to jobs",
    "Read",
    "Meditate",
    "Work on app",
    "Creatine",
    "Make bed",
    "Water"
  ];
  
  const habitList = document.getElementById("habit-list");
  const resetButton = document.getElementById("reset-button");
  
  const today = new Date().toDateString();
  
  let habitData = JSON.parse(localStorage.getItem("habits")) || {};
  let resetMode = false;
  let habitsToReset = new Set();
  
  // Initialize habits
  habits.forEach(habit => {
    if (!habitData[habit]) {
      habitData[habit] = { streak: 0, lastChecked: null };
    }
  });
  
  localStorage.setItem("habits", JSON.stringify(habitData));
  
  renderHabits();
  
  // ---------------- FUNCTIONS ----------------
  
  function renderHabits() {
    habitList.innerHTML = "";
  
    habits.forEach(habit => {
      const li = document.createElement("li");
  
      if (resetMode) {
        li.classList.add("reset-mode");
      }
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
  
      // Normal mode behavior
      if (!resetMode) {
        checkbox.checked = habitData[habit].lastChecked === today;
  
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            if (habitData[habit].lastChecked !== today) {
              habitData[habit].streak += 1;
              habitData[habit].lastChecked = today;
            }
          } else {
            habitData[habit].lastChecked = null;
          }
  
          saveAndUpdate();
        });
      }
  
      // Reset mode behavior
      if (resetMode) {
        checkbox.checked = habitsToReset.has(habit);
  
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            habitsToReset.add(habit);
          } else {
            habitsToReset.delete(habit);
          }
        });
      }
  
      const label = document.createElement("span");
      label.textContent = ` ${habit} — ${habitData[habit].streak} day(s) in a row`;
  
      li.appendChild(checkbox);
      li.appendChild(label);
      habitList.appendChild(li);
    });
  }
  
  function saveAndUpdate() {
    localStorage.setItem("habits", JSON.stringify(habitData));
    renderHabits();
  }
  
  // ---------------- RESET MODE ----------------
  
  resetButton.addEventListener("click", () => {
    if (!resetMode) {
      enterResetMode();
    } else {
      confirmReset();
    }
  });
  
  function enterResetMode() {
    resetMode = true;
    habitsToReset.clear();
    resetButton.textContent = "Confirm reset";
    renderHabits();
  
    // Add cancel button
    if (!document.getElementById("cancel-reset")) {
      const cancel = document.createElement("button");
      cancel.id = "cancel-reset";
      cancel.textContent = "Cancel";
      cancel.style.marginLeft = "10px";
  
      cancel.addEventListener("click", exitResetMode);
      resetButton.after(cancel);
    }
  }
  
  function confirmReset() {
    habitsToReset.forEach(habit => {
      habitData[habit].streak = 0;
      habitData[habit].lastChecked = null;
    });
  
    saveAndUpdate();
    exitResetMode();
  }
  
  function exitResetMode() {
    resetMode = false;
    habitsToReset.clear();
    resetButton.textContent = "Missed a day?";
  
    const cancel = document.getElementById("cancel-reset");
    if (cancel) cancel.remove();
  
    renderHabits();
  }
  