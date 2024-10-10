import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInput,  } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatInput,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchString: string = '';

  @Output() searchQuery = new EventEmitter<string>();

  onSearch(): void {
    // Emit the search string to the parent component
    this.searchQuery.emit(this.searchString);
  }
}
