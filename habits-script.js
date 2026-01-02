// List of habits
const habits = [
    "Make bed",
    "Read habits note",
    "Apply to jobs",
    "Read",
    "Meditate",
    "Work on app",
    "Creatine",
    "Water"
  ];
  
  const habitList = document.getElementById("habit-list");
  
  // Load saved data from localStorage or initialize
  let habitData = JSON.parse(localStorage.getItem("habits")) || {};
  
  // Create habit list items
  habits.forEach(habit => {
    if (!habitData[habit]) {
      habitData[habit] = { streak: 0, lastChecked: null };
    }
  
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
  
    const today = new Date().toDateString();
    if (habitData[habit].lastChecked === today) {
      checkbox.checked = true;
    }
  
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        if (habitData[habit].lastChecked !== today) {
          habitData[habit].streak += 1;
          habitData[habit].lastChecked = today;
        }
      } else {
        habitData[habit].lastChecked = null;
      }
      updateList();
      localStorage.setItem("habits", JSON.stringify(habitData));
    });
  
    const label = document.createElement("span");
    label.textContent = ` ${habit} — ${habitData[habit].streak} days in a row`;
  
    li.appendChild(checkbox);
    li.appendChild(label);
    habitList.appendChild(li);
  });
  
  // Function to refresh the streak display
  function updateList() {
    const items = habitList.querySelectorAll("li");
    items.forEach((li, index) => {
      const habit = habits[index];
      li.querySelector("span").textContent = ` ${habit} — ${habitData[habit].streak} days in a row`;
    });
  }
  