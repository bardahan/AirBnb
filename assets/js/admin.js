// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

var categories = [
  "Israel",
  "India",
  "Hawaii",
  "Austalia",
  "France",
  "Japan",
  "Egypt",
  "England",
  "Spain",
];

var categories_count = [];

var barConfig = {
  chart: {
    height: 350,
    type: "bar",
  },
  dataLabels: {
    enabled: false,
  },
  series: [],
  title: {
    text: "Sells",
  },
  noData: {
    text: "Loading...",
  },
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barConfig);
barChart.render();

$(window).on("load", function () {
  for (var i = 0; i < categories.length; i++) {
    $.ajax({
      type: "GET",
      indexValue: i,
      url: "http://localhost:3000/api/properties/country/" + categories[i],
      success: function (response) {
        categories_count.push({
          x: categories[this.indexValue],
          y: response.length || 0,
        });
        barChart.updateSeries([
          {
            name: "Country",
            data: categories_count,
          },
        ]);
      },
    }).done;
  }
});

categories_count2 = [];

// var areaChart = new ApexCharts(
//   document.querySelector("#area-chart"),
//   barConfig
// );
// areaChart.render();

// $(window).on("load", function () {
//   for (var i = 0; i < categories.length; i++) {
//     $.ajax({
//       type: "GET",
//       indexValue: i,
//       url: "http://localhost:3000/api/charges",
//       success: function (response) {
//         categories_count2.push({
//           x: categories[this.indexValue],
//           y: response.length || 0,
//         });
//         areaChart.updateSeries([
//           {
//             name: "Country",
//             data: categories_count2,
//           },
//         ]);
//       },
//     }).done;
//   }
// });

// AREA CHART
var areaChartOptions = {
  series: [
    {
      name: "Sales Orders",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "booking",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

var areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();
