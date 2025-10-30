// Get Retro theme chart colors from CSS variables
const getChartColor = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const retroColors = {
  color1: getChartColor("--chart-color-1"), // #223459 Navy
  color2: getChartColor("--chart-color-2"), // #6A5AAA Purple
  color3: getChartColor("--chart-color-3"), // #B45082 Pink
  color4: getChartColor("--chart-color-4"), // #F9767F Coral
  color5: getChartColor("--chart-color-5"), // #FFB142 Orange
  color6: getChartColor("--chart-color-6"), // #FFDE70 Yellow
  positive: getChartColor("--chart-semantic-positive"), // #37CD97 Green
  negative: getChartColor("--chart-semantic-negative"), // #F84444 Red
};

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
          retroColors.color4, // Coral for Persistent ADHD
          retroColors.color5, // Orange for Symptomatic ADHD
          retroColors.positive, // Green for No ADHD
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
          retroColors.color2 + "cc", // Purple with 80% opacity
          retroColors.color5 + "cc", // Orange with 80% opacity
          retroColors.color4 + "cc", // Coral with 80% opacity
        ],
        borderColor: [
          retroColors.color2, // Purple
          retroColors.color5, // Orange
          retroColors.color4, // Coral
        ],
        borderWidth: 2,
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
