import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { capitalizeFirstCharacter } from '../../utils/capitalizeFirstCharacter';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() dataUpdated: EventEmitter<any[]> = new EventEmitter<any[]>(); // Emit data changes to parent

  displayedColumns: string[] = ['name', 'type', 'captured', 'options'];
  dataSource = new MatTableDataSource<any>([]);
  capitalizeFirstChar = capitalizeFirstCharacter;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data; // Update data in MatTableDataSource
      this.dataSource.paginator = this.paginator; // Ensure paginator is set
    }
  }

  constructor(private apiService: ApiService) { }

  capture = (element: any) => {
    this.apiService.capture(element.name).subscribe({
      next: (response: any) => {
        this.data = response.data; // Update data with the response from the API
        this.totalItems = this.data.length; // Update total items
        this.dataSource.data = this.data; // Update the MatTableDataSource
        this.dataSource.paginator = this.paginator; // Set the paginator

        // Emit data changes to the parent component
        this.dataUpdated.emit(response.data);
      },
      error: (err: any) => {
        console.error('Error during capture:', err);
      }
    });
  };

  destroy = (element: any) => {
    this.apiService.destroy(element.name).subscribe({
      next: (response: any) => {
        this.data = response.data; // Update data with the response from the API
        this.totalItems = this.data.length; // Update total items
        this.dataSource.data = this.data; // Update the MatTableDataSource
        this.dataSource.paginator = this.paginator; // Set the paginator

        // Emit data changes to the parent component
        this.dataUpdated.emit(response.data);
      },
      error: (error: any) => {
        console.error('Error during destroy:', error);
      }
    });
  };

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
