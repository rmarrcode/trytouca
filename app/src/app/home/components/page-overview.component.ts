// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FrontendOverviewSection } from '@/core/models/frontendtypes';
import { Metric, MetricChangeType } from '@/home/models/metric.model';
import { DateTimePipe } from '@/shared/pipes';

type Ring = {
  header: string;
  footer: string[];
  title: string;
  backColor: string;
  frontColor: string;
  frontValue: number;
};

enum RingColor {
  Gray = '#d1d5db',
  Green = '#28a745',
  Red = '#cc3c3c'
}

@Component({
  selector: 'app-home-page-overview',
  templateUrl: './page-overview.component.html',
  styles: [
    `
      svg circle {
        transition: stroke-dashoffset 0.35s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    `
  ],
  providers: [DateTimePipe, PercentPipe]
})
export class PageOverviewComponent {
  metricsRing: Ring;
  resultsRing: Ring;
  statements: string[];

  constructor(
    private dateTimePipe: DateTimePipe,
    private percentPipe: PercentPipe
  ) {}

  @Input()
  set inputs(inputs: FrontendOverviewSection) {
    this.statements = inputs.statements;

    this.resultsRing = this.findResultsRing(inputs);
    this.metricsRing = this.findMetricsRing(inputs);

    const overview = document.querySelector('.wsl-page-overview');
    const circles = overview.querySelectorAll('circle');
    this.updateCircle(circles[1], this.resultsRing.frontValue);
    this.updateCircle(circles[3], this.metricsRing.frontValue);
  }

  private findResultsRing(inputs: FrontendOverviewSection): Ring {
    return {
      header: 'Match Rate' + (inputs.inProgress ? ' (so far)' : ''),
      footer: [],
      backColor: RingColor.Gray,
      frontColor: inputs.resultsScore === 1 ? RingColor.Green : RingColor.Red,
      frontValue: inputs.resultsScore,
      title: this.percentPipe.transform(inputs.resultsScore, '1.0-0')
    };
  }

  /**
   * frontColor: metric.score() > 0 ? RingColor.Red : RingColor.Green,
   * frontValue: Math.min(metric.score(), 1),
   */
  private findMetricsRing(inputs: FrontendOverviewSection): Ring {
    const Type = MetricChangeType;
    const metric = new Metric(
      '',
      inputs.metricsDurationHead,
      inputs.metricsDurationHead -
        inputs.metricsDurationChange * inputs.metricsDurationSign
    );
    const type = metric.changeType();

    // If the two versions have no elements in common, metric has no meaning.
    if (type === Type.Missing) {
      return {
        header: 'Duration' + (inputs.inProgress ? ' (so far)' : ''),
        footer: [''],
        title: 'N/A',
        backColor: RingColor.Gray,
        frontColor: RingColor.Red,
        frontValue: 1
      };
    }

    const headDesc = this.dateTimePipe.transform(metric.src, 'duration');
    const changeDesc = this.dateTimePipe.transform(
      metric.absoluteDifference(),
      'duration'
    );
    const title = new Metric('', metric.src, metric.dst).changeDescription();

    return {
      header: 'Duration' + (inputs.inProgress ? ' (so far)' : ''),
      footer:
        type === Type.Same
          ? [headDesc]
          : type === Type.Faster
          ? [headDesc, `(${changeDesc} faster)`]
          : [headDesc, `(${changeDesc} slower)`],
      title:
        type === Type.Same
          ? 'Same'
          : type === Type.Faster
          ? '-' + title
          : '+' + title,
      backColor: RingColor.Gray,
      frontColor: type === Type.Slower ? RingColor.Red : RingColor.Green,
      frontValue: 1
    };
  }

  private updateCircle(circle: SVGCircleElement, value: number) {
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - value * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
  }
}
