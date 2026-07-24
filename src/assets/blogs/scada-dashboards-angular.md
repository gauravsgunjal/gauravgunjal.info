# Building Real-Time SCADA Dashboards with Angular and Chart Libraries

Monitoring dashboards for industrial systems — in my case, solar and bio-energy power plants — have a
very different design brief from a typical admin panel. Operators need to spot an anomaly in seconds,
not scroll to find it.

## The problem with generic dashboards

A standard CRUD-style admin UI optimizes for browsing records. A SCADA-style monitoring dashboard
optimizes for **exception detection**. That single shift in priority changes almost every UI decision:

- Default views should show *deviations from normal*, not just raw numbers.
- Color and motion should be reserved for genuine alerts — overusing red or blinking elements trains
  operators to ignore them.
- Comparative views (this device vs. plant average vs. yesterday) matter more than absolute values.

## Picking a charting library

Across different plant monitoring platforms I've worked on, I evaluated amCharts, Chart.js, and Toast
UI Charts. My rough guidance:

| Library | Strength | Where it fit |
|---|---|---|
| amCharts | Rich interactivity, drill-downs | Executive/owner-facing performance reports |
| Chart.js | Lightweight, fast to integrate | High-frequency device-level graphs |
| Toast UI | Strong out-of-the-box theming | Quick internal monitoring views |

## Structuring the Angular layer

```typescript
@Component({
  selector: 'app-device-performance-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas></canvas>`
})
export class DevicePerformanceChart {
  @Input({ required: true }) readings: DeviceReading[] = [];
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngOnChanges(): void {
    this.chart?.destroy();
    this.chart = new Chart(this.canvasRef.nativeElement, this.buildConfig());
  }
}
```

Keeping chart components `OnPush` and rebuilding only on input changes kept the dashboard responsive
even when polling dozens of devices on a short interval.

## Alerting without alert fatigue

The most valuable lesson: an alerting system's usefulness is measured by how often operators *act* on
an alert, not how many alerts it fires. Grouping related faults, adding a lightweight ticketing
workflow, and letting operators snooze known issues cut noise dramatically compared to a raw
threshold-crossing notification stream.

## Takeaway

Real-time monitoring UIs reward restraint. The best dashboard isn't the one with the most charts — it's
the one where an operator can tell, in under five seconds, whether everything is fine.
