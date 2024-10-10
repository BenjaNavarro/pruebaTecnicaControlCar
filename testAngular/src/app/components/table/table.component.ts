import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { capitalizeFirstCharacter } from '../../utils/capitalizeFirstCharacter';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { ApiService } from '../../api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginator,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: any = new EventEmitter<PageEvent>();
  displayedColumns: string[] = ['name', 'type', 'captured', 'options'];
  capitalizeFirstChar = capitalizeFirstCharacter;

  constructor(private apiService: ApiService) { }
  
  capture = (element: any) => {
    console.log({element});
    this.apiService.capture(element.name).subscribe({
      next: (response: any) => {
        console.log('Captured Response:', response);
        this.data = response.data;
      },
      error: (err: any) => {
        console.error('Error during capture:', err);
      }
    });    
  };
  destroy = (element: any) => {
    console.log({element});
    this.apiService.destroy(element.name).subscribe({
      next: (response: any) => {
        console.log('Destroy Response:', response);
        this.data = response.data;
      },
      error: (error: any) => {
        console.error('Error during destroy:', error);
      }
    });
    
  };

  onPageChange(event: PageEvent) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }
}
