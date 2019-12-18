import { Component, OnInit } from '@angular/core';
import { Property } from '../property'
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[];
  selectedProperty: Property;
  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getPropertyes();
  }

  getPropertyes(): void {
    this.propertyService.getProperties().subscribe(properties => this.properties = properties);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.propertyService.addProperty({ name } as Property)
      .subscribe(property => {
        this.properties.push(property);
      })
  }
}
