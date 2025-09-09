import { FitnessEntry } from '../../types';
import styles from './styles.module.css';

interface Props {
  data: FitnessEntry[];
}

interface WeightDataPoint {
  date: string;
  weight: number;
  movingAverage?: number;
}

export const WeightChart = ({ data }: Props) => {
  // Filter and prepare weight data
  const weightData: WeightDataPoint[] = data
    .filter(entry => entry.weight !== 'none' && typeof entry.weight === 'number')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: entry.date,
      weight: entry.weight as number
    }));

  // Calculate 7-day moving average
  const dataWithMovingAverage = weightData.map((point, index) => {
    // Calculate average of current point and previous 6 points
    const lastDays = index < 6
      ? weightData.slice(0, index + 1)
      : weightData.slice(index - 6, index + 1);
    const sum = lastDays.reduce((acc, curr) => acc + curr.weight, 0);
    const movingAverage = sum / lastDays.length;

    return {
      ...point,
      movingAverage: Math.round(movingAverage * 10) / 10
    };
  });

  // Generate chart ID for multiple charts on the page
  const chartId = `weightChart_${Math.random().toString(36).substr(2, 9)}`;

  if (weightData.length === 0) {
    return (
      <div className={styles.noData}>
        <p>No weight data available to display chart.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Weight Progress</h3>
      <div className={styles.chartWrapper}>
        <canvas id={chartId} className={styles.chart}></canvas>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Wait for Chart.js to be available
              function initChart() {
                if (typeof Chart === 'undefined') {
                  setTimeout(initChart, 100);
                  return;
                }

                const ctx = document.getElementById('${chartId}');
                if (!ctx || ctx.dataset.chartInitialized) return;
                
                const data = ${JSON.stringify(dataWithMovingAverage)};
                
                new Chart(ctx, {
                  type: 'line',
                  data: {
                    labels: data.map(point => {
                      const date = new Date(point.date);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }),
                    datasets: [
                      {
                        label: 'Weight',
                        data: data.map(point => point.weight),
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: 'rgb(54, 162, 235)',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.1,
                        fill: false
                      },
                      {
                        label: '7-Day Moving Average',
                        data: data.map(point => point.movingAverage || null),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: 'rgb(255, 99, 132)',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        fill: false,
                        borderDash: [5, 5]
                      }
                    ]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: false
                      },
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          color: 'rgb(255, 255, 255)',
                          font: {
                            size: 12
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Date',
                          color: 'rgb(255, 255, 255)'
                        },
                        ticks: {
                          color: 'rgb(255, 255, 255)',
                          maxTicksLimit: 10
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Weight (kg)',
                          color: 'rgb(255, 255, 255)'
                        },
                        ticks: {
                          color: 'rgb(255, 255, 255)',
                          callback: function(value) {
                            return value + ' kg';
                          }
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        beginAtZero: false
                      }
                    },
                    interaction: {
                      intersect: false,
                      mode: 'index'
                    },
                    elements: {
                      point: {
                        hoverRadius: 8
                      }
                    }
                  }
                });
                
                ctx.dataset.chartInitialized = 'true';
              }
              
              initChart();
            })();
          `
        }}
      />
    </div>
  );
};
