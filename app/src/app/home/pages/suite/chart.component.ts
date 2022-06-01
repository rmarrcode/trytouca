// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { Component, Input, OnDestroy } from '@angular/core';
import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';

import { DateTimePipe } from '@/shared/pipes';

Chart.register(
  LineController,
  LinearScale,
  LineElement,
  CategoryScale,
  PointElement,
  Tooltip,
  Filler
);

@Component({
  selector: 'app-suite-chart-runtime',
  templateUrl: './chart.component.html',
  providers: [DateTimePipe]
})
export class SuiteChartRuntimeComponent implements OnDestroy {
  private chart: Chart;

  constructor(private dateTimePipe: DateTimePipe) {}

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  @Input()
  set perfs(perfs: { name: string; slug: string; duration: number }[]) {
    if (!perfs || perfs.length == 0) {
      return;
    }
    if (this.chart) {
      this.chart.destroy();
    }
    perfs.reverse();
    const chartContext = (
      document.getElementById('suite-chart-runtime-trend') as HTMLCanvasElement
    ).getContext('2d');
    this.chart = new Chart(chartContext, {
      type: 'line',
      data: {
        labels: perfs.map((v) => v.name),
        datasets: [
          {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            borderWidth: 1,
            tension: 0.25,
            data: perfs.map((v) => v.duration),
            fill: 'origin',
            label: 'Overall Execution Runtime',
            pointRadius: 4,
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ]
      },
      options: {
        aspectRatio: 2,
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            enabled: true,
            intersect: false,
            mode: 'nearest',
            callbacks: {
              label: (context) => {
                const point = context.parsed.y;
                return this.dateTimePipe?.transform(point, 'duration') ?? '';
              }
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 10
            }
          },
          y: {
            display: true,
            ticks: {
              callback: (value: number) => {
                return this.dateTimePipe.transform(value, 'duration');
              },
              maxTicksLimit: 5
            },
            title: {
              display: false
            }
          }
        }
      }
    });
  }
}
