import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Property } from '../domain/property';
import { PropertyService } from '../service/property.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit{

  constructor(
    private propertyService: PropertyService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
    ) { }
  properties: Property[] = [];
  dataSource = new PostDataSource(this.propertyService);
  // displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  displayedColumns = ['address', 'status', 'yearBuilt', 'price', 'edit'];
  
  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => this.properties = properties);
  }

  add(address: string): void {
    address = address.trim();
    if (!address) {
      return;
    }
    this.propertyService.addProperty({ address: address } as Property)
      .subscribe(property => {
        // this.dataSource.connect();
        // this.properties.push(property);
        this.dataSource = new PostDataSource(this.propertyService);
      })
  }  

  editOwner(): void {
    this.router.navigateByUrl('/editOwner');
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private propertyService: PropertyService) {
    super();
  }

  connect(): Observable<Property[]> {
    return this.propertyService.getProperties();
  }

  disconnect() {
  }
}