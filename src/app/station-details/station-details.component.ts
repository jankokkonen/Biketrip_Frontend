import { Component, Input } from '@angular/core';
import { Stations } from 'src/shared/interfaces';
@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent {
  @Input() station?: Stations;

  
}
