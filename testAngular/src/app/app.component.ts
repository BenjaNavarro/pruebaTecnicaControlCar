import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
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

export class AppComponent implements OnInit{
  title = 'testAngular';
  data: any[] = [];
  paginatedData: any[] = [];
  loading = true;
  noData = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 150;
  totalPages: number = this.totalItems/this.pageSize;
  searchString: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Make a GET request when the component is initialized
    this.apiService.getData().subscribe({
      next: (response: any) => {
        console.log(response);  // Handle successful response
        this.data = response.data;
        this.loading = false; // Set loading to false after data is fetched
        this.updatePaginatedData();
      },
      error: (error: unknown) => {
        console.error('Error occurred:', error);  // Handle error
        this.loading = false; // Set loading to false after data is fetched
      },
    });
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  onPageChange(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;  // Page index is zero-based in the paginator
    this.pageSize = pageEvent.pageSize;
    this.updatePaginatedData();
  }

  searchToAPI(searchString: string){
    this.apiService.search(this.searchString).subscribe({
      next: (response: any) => {
        console.log({response});
        
      },
      error: (error: any) => {
        console.log({error});
        
      }
    })
  }
}
