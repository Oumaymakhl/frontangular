

  import { Component, OnInit } from '@angular/core';
  import { StatisticsService } from 'app/shared/API_service/statistics.service';
  import Chart from 'chart.js';
  import { Statistics } from 'app/shared/model/Statistics'; // Assurez-vous que le chemin d'importation est correct
  
  
@Component({
  selector: 'app-statistique1',
  templateUrl: './statistique1.component.html',
  styleUrls: ['./statistique1.component.css']
})
  export class Statistique1Component implements OnInit {
      meetingsCount: number = 0;
      tasksCount: number = 0;
      participantsCount: number = 0;
      meetingImagePath: string = './assets/img/meeting-icon-png-presentation-icon-board-meeting-icon-meeting-icon--4.png';
    tasksImagePath: string = './assets/img/Utilities-tasks-icon.png';
    participantsImagePath: string = './assets/img/8428718.png';
    constructor(private statisticsService: StatisticsService) { }
  
    ngOnInit(): void {
      this.statisticsService.getTotals().subscribe((totalsData: any) => {
        this.createTotalsChart(totalsData);
        this.meetingsCount = totalsData.reunions_count;
        this.tasksCount = totalsData.tasks_count;
        this.participantsCount = totalsData.users_count;
        this.updateTotalsChart();
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
  
      this.statisticsService.getAdminCount().subscribe((adminCountData: any) => {
          this.createAdminCountChart(adminCountData);
        });
    
        this.statisticsService.getDocumentCount().subscribe((documentCountData: any) => {
          this.createDocumentCountChart(documentCountData);
        });
    
        this.statisticsService.getDecisionCount().subscribe((decisionCountData: any) => {
          this.createDecisionCountChart(decisionCountData);
        });
    
        this.statisticsService.getLikeDislikeComparison().subscribe((likeDislikeComparisonData: any) => {
          this.createLikeDislikeComparisonChart(likeDislikeComparisonData);
        });
    
        this.statisticsService.getDecisionCountAdmin().subscribe((decisionCountAdminData: any) => {
          this.createDecisionCountAdminChart(decisionCountAdminData);
        });
    
        this.statisticsService.getTaskCountAdmin().subscribe((taskCountAdminData: any) => {
          this.createTaskCountAdminChart(taskCountAdminData);
        });
   
  
      
    }
    updateTotalsChart(): void {
      // Mettre à jour les valeurs des boîtes de nombre
      const meetingsCountElement = document.getElementById('meetingsCount');
      const tasksCountElement = document.getElementById('tasksCount');
      const participantsCountElement = document.getElementById('participantsCount');
  
      if (meetingsCountElement && tasksCountElement && participantsCountElement) {
          meetingsCountElement.textContent = this.meetingsCount.toString();
          tasksCountElement.textContent = this.tasksCount.toString();
          participantsCountElement.textContent = this.participantsCount.toString();
      }
    }
    createTotalsChart(data: any): void {
      const meetingsBox = document.getElementById('meetingBox'); // Changer 'meetingsBox' en 'meetingBox'
      if (meetingsBox) {
          meetingsBox.innerHTML = `
              <h3>${data.reunions_count}</h3>
              <p>Meetings</p>
              <img src="./assets/img/meeting-icon-png-presentation-icon-board-meeting-icon-meeting-icon--4.png" alt="Meetings Image">`; // Ajouter l'image ici
      }
  
      const tasksBox = document.getElementById('tasksBox');
      if (tasksBox) {
          tasksBox.innerHTML = `
              <h3>${data.tasks_count}</h3>
              <p>Tasks</p>
              <img src="./assets/img/Utilities-tasks-icon.png" alt="Tasks Image">`; // Ajouter l'image ici
      }
  
      const participantsBox = document.getElementById('participantsBox');
      if (participantsBox) {
          participantsBox.innerHTML = `
              <h3>${data.users_count}</h3>
              <p>Participants</p>
              <img src="./assets/img/8428718.png" alt="Participants Image">`; // Ajouter l'image ici
      }
  
      const ctx = document.getElementById('totalsChart') as HTMLCanvasElement;
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['Meetings', 'Tasks', 'Participants'],
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
                label: 'Users by Company',
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
  createAdminCountChart(data: any): void {
      const ctx = document.getElementById('adminCountChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Admin Count'],
          datasets: [{
            label: 'Admin Count',
            data: [data.admin_count],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
    createDocumentCountChart(data: any): void {
      const ctx = document.getElementById('documentCountChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Document Count'],
          datasets: [{
            label: 'Document Count',
            data: [data.document_count],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
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
    
    createDecisionCountChart(data: any): void {
      const ctx = document.getElementById('decisionCountChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Decision Count'],
          datasets: [{
            label: 'Decision Count',
            data: [data.decision_count],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
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
    
    createLikeDislikeComparisonChart(data: any): void {
      const ctx = document.getElementById('likeDislikeComparisonChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Likes', 'Dislikes'],
          datasets: [{
            label: 'Like vs Dislike',
            data: [data.like_count, data.dislike_count],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
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
    
    createDecisionCountAdminChart(data: any): void {
      const ctx = document.getElementById('decisionCountAdminChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Decision Count for Admin'],
          datasets: [{
            label: 'Decision Count for Admin',
            data: [data.decision_count],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
    
    createTaskCountAdminChart(data: any): void {
      const ctx = document.getElementById('taskCountAdminChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Task Count for Admin'],
          datasets: [{
            label: 'Task Count for Admin',
            data: [data.total_tasks_by_admin],
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
            borderColor: 'rgba(255, 205, 86, 1)',
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
  