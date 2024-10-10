import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';

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
  data: any;
  loading = true;
  noData = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Make a GET request when the component is initialized
    this.apiService.getData().subscribe({
      next: (response: any) => {
        console.log(response);  // Handle successful response
        this.data = response;
        this.loading = false; // Set loading to false after data is fetched
      },
      error: (error: unknown) => {
        console.error('Error occurred:', error);  // Handle error
        this.loading = false; // Set loading to false after data is fetched
      },
    });
  }
}
