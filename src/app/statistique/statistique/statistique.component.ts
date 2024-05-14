import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'app/shared/API_service/statistics.service';
import Chart from 'chart.js';
import { Statistics } from 'app/shared/model/Statistics'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getTotals().subscribe((totalsData: any) => {
      this.createTotalsChart(totalsData);
    });

    this.statisticsService.getAverageReunionsPerUser().subscribe((averageReunionsData: any) => {
      this.createAverageReunionsChart(averageReunionsData);
    });

    this.statisticsService.getTasksByStatus().subscribe((tasksByStatusData: any) => {
      this.createTasksByStatusChart(tasksByStatusData);
    });

    this.statisticsService.taskCompletionRateByUser().subscribe((taskCompletionRateData: any) => {
      this.createTaskCompletionRateChart(taskCompletionRateData);
    });

    this.statisticsService.getAverageTasksPerUser().subscribe((averageTasksPerUserData: any) => {
      this.createAverageTasksPerUserChart(averageTasksPerUserData);
    });

    this.statisticsService.getUsersByCompany().subscribe((usersByCompanyData: any) => {
      this.createUsersByCompanyChart(usersByCompanyData);
    });

  

    
  }
  createTotalsChart(data: any): void {
    const ctx = document.getElementById('totalsChart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Reunion', 'Task', 'Participant'],
            datasets: [{
                label: 'Totals',
                data: [data.reunions_count, data.tasks_count, data.users_count],
                backgroundColor: 'rgba(0, 51, 102, 0.9)',
                borderColor: 'rgba(0, 51, 102, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true, // Commencer à partir de zéro
                    min: 0, // Définir la valeur minimale de l'axe y à 0
                    suggestedMax: Math.max(data.reunions_count, data.tasks_count, data.users_count) + 5 // Augmenter la valeur maximale suggérée de l'axe y pour inclure les données
                }
            },
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2, // Épaisseur de la bordure des barres
                    borderSkipped: 'start', // Indique que la bordure est ignorée à l'extrémité de la barre
                    borderRadius: 20 // Rayon des coins des barres
                }
            }
        }
    });
}



createAverageReunionsChart(data: any): void {
  const ctx = document.getElementById('averageReunionsChart') as HTMLCanvasElement;
  
  // Extraire les données
  const averageReunionsPerUser = data.average_reunions_per_user;

  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Average Reunions', 'Remaining'],
          datasets: [{
              data: [averageReunionsPerUser, 100 - averageReunionsPerUser],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(0, 51, 102, 0.9)',
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(0, 51, 102,1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          plugins: {
              datalabels: {
                  formatter: (value, ctx) => {
                      const dataset = ctx.chart.data.datasets[ctx.datasetIndex];
                      const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                      const percentage = Math.round((value / total) * 100) + '%';
                      return `${value} (${percentage})`;
                  },
                  color: '#fff',
              }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}




createTasksByStatusChart(data: any): void {
    const ctx = document.getElementById('tasksByStatusChart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['to-do', 'completed'],
            datasets: [{
                label: 'Tasks by Status',
                data: data.tasks_by_status.map((status: any) => status.count),
                backgroundColor: [
                    'rgba(0, 51, 102, 0.9)',
                    'rgba(54, 162, 235, 0.5)',
                ],
                borderColor: [
                    'rgba(0, 51, 102,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createTaskCompletionRateChart(data: any): void {
  const completedTasks = data.task_completion_rate_by_user.map((user: any) => user.completed_tasks_count);
  const totalTasks = data.task_completion_rate_by_user.map((user: any) => user.tasks_count);
  const incompleteTasks = totalTasks.map((total, index) => total - completedTasks[index]);

  const ctx = document.getElementById('taskCompletionRateChart') as HTMLCanvasElement;
  new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Completed', 'Incomplete'],
          datasets: [{
              label: 'Task Completion Rate',
              data: [completedTasks.reduce((a: number, b: number) => a + b, 0), incompleteTasks.reduce((a: number, b: number) => a + b, 0)],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(0, 51, 102, 0.75)',
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(0, 51, 102, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
createAverageTasksPerUserChart(data: any): void {
  const ctx = document.getElementById('averageTasksPerUserChart') as HTMLCanvasElement;
  new Chart(ctx, {
      type: 'bar', // Utilisez le type de graphique "bar" pour un graphique en barres
      data: {
          labels: ['Average Tasks per User'],
          datasets: [{
              label: 'Average Tasks per User',
              data: [data.average_tasks_per_user],
              backgroundColor: 'rgba(0, 51, 102, 0.9)', // Couleur de fond des barres
              borderColor: 'rgba(0, 51, 102,1)', // Couleur de la bordure des barres
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              legend: {
                  display: false // Désactive l'affichage de la légende
              }
          },
          layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
          },
          indexAxis: 'y',
          elements: {
              bar: {
                  borderWidth: 2, // Épaisseur de la bordure des barres
                  borderSkipped: 'start', // Indique que la bordure est ignorée à l'extrémité de la barre
                  borderRadius: 20 // Rayon des coins des barres
              }
          }
      }
  });
}



createUsersByCompanyChart(data: any): void {
  const ctx = document.getElementById('usersByCompanyChart') as HTMLCanvasElement;
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: data.map((item: any) => `Company ${item.company_id}`),
          datasets: [{
              label: 'Utilisateurs par société',
              data: data.map((item: any) => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}


}
