// Get CSS variable value
const getCSSVar = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

// ADHD Pie Chart (Doughnut)
const ctx = document.getElementById("adhdPieChart");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Persistent ADHD (2.6%)",
      "Symptomatic ADHD (6.8%)",
      "No ADHD (90.6%)",
    ],
    datasets: [
      {
        label: "Adult ADHD Distribution",
        data: [2.6, 6.8, 90.6],
        backgroundColor: [
          getCSSVar("--chart-color-3"), // Pink for Persistent ADHD
          getCSSVar("--chart-color-2"), // Purple for Symptomatic ADHD
          getCSSVar("--chart-color-5"), // Orange for No ADHD
        ],
        hoverOffset: 4,
      },
    ],
  },
});

// ADHD Bar Chart (Horizontal)
const ctxBar = document.getElementById("adhdBarChart");

new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: [
      "General Population",
      "Substance Use Treatment",
      "Ex-Prisoners",
    ],
    datasets: [
      {
        label: "ADHD Prevalence (%)",
        data: [6.5, 12, 31],
        backgroundColor: [
          getCSSVar("--chart-color-2"), // Purple
          getCSSVar("--chart-color-5"), // Orange
          getCSSVar("--chart-color-4"), // Coral
        ],
        borderColor: [
          "#ffffff", // White border
          "#ffffff",
          "#ffffff",
        ],
        borderWidth: 3,
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 35,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "ADHD Prevalence in Different Populations (England)",
      },
    },
  },
});
