const crimeData = {
    states: ['Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'West Bengal', 'Madhya Pradesh', 'Assam', 'Kerala', 'Odisha', 'Bihar', 'Karnataka'],
    stateCounts: [543210, 345678, 312459, 289123, 267891, 234567, 198765, 187654, 176543, 165432],
    crimeTypes: ['Domestic Violence', 'Kidnapping & Abduction', 'Rape', 'Dowry Deaths', 'Women Trafficking'],
    crimeTypeCounts: [52.32, 38.09, 5.83, 3.50, 0.26],
    yearlyData: {
        2017: 450000,
        2018: 478000,
        2019: 502000,
        2020: 485000, // COVID impact
        2021: 535000
    }
};

let charts = {};

function initCharts() {
    const statesCtx = document.getElementById('statesChart').getContext('2d');
    charts.states = new Chart(statesCtx, {
        type: 'bar',
        data: {
            labels: crimeData.states,
            datasets: [{
                label: 'Total Crimes',
                data: crimeData.stateCounts,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
                    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
                ],
                borderColor: '#2c3e50',
                borderWidth: 0,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ff6b6b',
                    borderWidth: 0,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            const percentage = ((context.parsed.y / crimeData.stateCounts.reduce((a,b) => a+b, 0)) * 100).toFixed(2);
                            return `Crimes: ${context.parsed.y.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });

    const crimeTypeCtx = document.getElementById('crimeTypeChart').getContext('2d');
    charts.crimeType = new Chart(crimeTypeCtx, {
        type: 'doughnut',
        data: {
            labels: crimeData.crimeTypes,
            datasets: [{
                data: crimeData.crimeTypeCounts,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
                ],
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4ecdc4',
                    borderWidth: 0,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    const trendCtx = document.getElementById('trendChart').getContext('2d');
    charts.trend = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: Object.keys(crimeData.yearlyData),
            datasets: [{
                label: 'Total Crimes',
                data: Object.values(crimeData.yearlyData),
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ff6b6b',
                    borderWidth: 0,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            return `Crimes: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutCubic'
            }
        }
    });

    const regionalCtx = document.getElementById('regionalChart').getContext('2d');
    charts.regional = new Chart(regionalCtx, {
        type: 'radar',
        data: {
            labels: ['North', 'South', 'East', 'West', 'Central', 'Northeast'],
            datasets: [{
                label: 'Crime Intensity',
                data: [85, 65, 75, 70, 80, 45],
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78, 205, 196, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#4ecdc4',
                pointBorderColor: '#fff',
                pointborderWidth: 0,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBack'
            }
        }
    });
}

function updateCharts() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    
    setTimeout(() => {
        const yearFilter = document.getElementById('yearFilter').value;
        const crimeFilter = document.getElementById('crimeFilter').value;
        
        if (charts.states) {
            const multiplier = yearFilter === 'all' ? 1 : Math.random() * 0.5 + 0.5;
            charts.states.data.datasets[0].data = crimeData.stateCounts.map(val => Math.floor(val * multiplier));
            charts.states.update('active');
        }
        
        loading.style.display = 'none';
    }, 800);
}

function updateTopStates(count) {
    document.getElementById('stateCountLabel').textContent = count;
    if (charts.states) {
        charts.states.data.labels = crimeData.states.slice(0, count);
        charts.states.data.datasets[0].data = crimeData.stateCounts.slice(0, count);
        charts.states.update();
    }
}

function highlightChart(type) {
    const containers = document.querySelectorAll('.chart-container');
    containers.forEach(container => {
        container.style.transform = 'scale(1)';
        container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    setTimeout(() => {
        containers.forEach(container => {
            container.style.transform = 'scale(1)';
            container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    
    const elements = document.querySelectorAll('.stat-card, .chart-container, .insight-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});