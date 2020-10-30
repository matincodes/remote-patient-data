
const bar = document.querySelector(".nav__link");
const drop = document.querySelector("#bell");
const body = document.querySelector("body");

 bar.addEventListener("click", () => {
    body.classList.toggle("sidebar-expand")
 });

 drop.addEventListener("click", () => {
  body.classList.toggle("dropdown-expand")
});

const tabs = document.querySelectorAll("[data-tab-target]")
const tabContents = document.querySelectorAll("[data-tab-content]")

tabs.forEach(tab => {
  tab.addEventListener('click', ()=>{
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })

    tab.classList.add("active")
    target.classList.add("active")
  })
})



const spark1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 120,
      width: '80%',
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [8, 8, 8, 17, 4, 25, 12, 15, 9, 13, 10, 10]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#d40e0e'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  

  const spark2 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'area',
      width: '100%',
      height: 120,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.7,
        }
      },
    series: [{
      data: [7, 6, 10, 7, 11, 8, 12, 7, 13, 8]
    }],
    stroke: {
        curve: 'smooth',
        dashArray: [5]
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fcba03'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }

  const spark3 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'area',
      width: '100%',
      height: 120,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.7,
        }
      },
    series: [{
      data: [7, 6, 8, 7, 15, 10, 11, 8, 12, 7]
    }],
    stroke: {
        curve: 'smooth',
        dashArray: [5]
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#31fc03'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
new ApexCharts(document.querySelector("#spark1"), spark1).render()
new ApexCharts(document.querySelector("#spark2"), spark2).render()
new ApexCharts(document.querySelector("#spark3"), spark3).render()
