import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // <-- Import MatTableModule

declare interface PokemonElement {
  id: number,
  name: string,
  type: string,
  captured?: boolean,
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  @Input() data: any;
  displayedColumns: string[] = ['name', 'type', 'captured', 'options'];

  log = (data: any) => console.log({data});

  
}
