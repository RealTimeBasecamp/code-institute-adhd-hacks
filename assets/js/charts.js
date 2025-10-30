// Get CSS variable value
const getCSSVar = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

// Store chart instances globally so we can update them
let pieChart;
let barChart;

// Function to create/update charts with current theme colors
function initCharts() {
  const bodyColor = getCSSVar("--bs-body-color");
  const borderColor = getCSSVar("--bs-border-color");

  // ADHD Pie Chart (Doughnut)
  const ctx = document.getElementById("adhdPieChart");
  
  if (pieChart) {
    pieChart.destroy(); // Destroy existing chart before creating new one
  }

  pieChart = new Chart(ctx, {
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
    options: {
      plugins: {
        legend: {
          labels: {
            color: bodyColor,
          },
        },
      },
    },
  });

  // ADHD Bar Chart (Horizontal)
  const ctxBar = document.getElementById("adhdBarChart");
  
  if (barChart) {
    barChart.destroy(); // Destroy existing chart before creating new one
  }

  barChart = new Chart(ctxBar, {
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
            borderColor, // Use theme border color
            borderColor,
            borderColor,
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
            color: bodyColor,
          },
          ticks: {
            color: bodyColor,
          },
          grid: {
            color: borderColor,
          },
        },
        y: {
          ticks: {
            color: bodyColor,
          },
          grid: {
            color: borderColor,
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
          color: bodyColor,
        },
      },
    },
  });
}

// Initialize charts on page load
initCharts();

// Listen for theme changes and reinitialize charts
// Create a MutationObserver to watch for data-bs-theme changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
      initCharts(); // Reinitialize charts with new theme colors
    }
  });
});

// Start observing the html element for attribute changes
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-bs-theme']
});
