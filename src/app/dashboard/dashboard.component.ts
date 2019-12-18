import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  properties: Property[] = [];
  
  constructor(private propertyService: PropertyService) { }
  
  ngOnInit() {
    this.getProperties();
  }
  
  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => this.properties = properties.slice(1, 5));
  }
}