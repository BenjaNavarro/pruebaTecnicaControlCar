import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent,
    TableComponent,
    SearchBarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'testAngular';
  data: any[] = [];
  paginatedData: any[] = [];
  loading = true;
  noData = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0; // Initialize totalItems to 0
  totalPages: number = 0; // Initialize totalPages to 0
  searchString: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Make a GET request when the component is initialized
    this.apiService.getData().subscribe({
      next: (response: any) => {
        this.data = response.data;
        this.loading = false;
        this.totalItems = this.data.length; // Set totalItems based on the initial response
        this.updatePaginatedData(); // Call this to set paginated data
      },
      error: (error: unknown) => {
        console.error('Error occurred:', error);
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }
  

  updatePaginatedData() {
    const startIndex = (this.currentPage + 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.paginatedData = this.data.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Update totalPages
  }

  onPageChange(pageEvent: PageEvent) {
    console.log({pageEvent});
    
    this.currentPage = pageEvent.pageIndex + 1; // Page index is zero-based in the paginator
    this.pageSize = pageEvent.pageSize;
    this.updatePaginatedData();
  }

  onDataUpdated(newData: any[]) {
    this.data = newData;
    this.totalItems = newData.length; // Update the total number of items
    this.updatePaginatedData(); // Update paginated data
  }

  searchToAPI(searchString: string) {
    
    if(!searchString) return;

    this.loading = true;
    this.apiService.search(searchString).subscribe({
      next: (response: any) => {
        console.log({response});
        if(response.data){
          this.data = response.data;
          this.totalItems = this.data.length;
          this.updatePaginatedData(); // Call this to set paginated data
        }
      },
      error: (error: any) => {
        console.log({error});
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
