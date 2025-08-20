import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

var listPersonas: Persona[] = [
  {
    nombre: 'Juan',
    apellido: 'perez',
    tipoDocumento: 'DNI',
    documento: 123424242,
    correo: 'josepsf@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Juan Antonio',
    apellido: 'pereza',
    tipoDocumento: 'DNI',
    documento: 6664242,
    correo: 'josssep@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Pedro',
    apellido: 'sanchez',
    tipoDocumento: 'DNI',
    documento: 2423424242,
    correo: 'ajosep1@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Pedro',
    apellido: 'sanchez',
    tipoDocumento: 'DNI',
    documento: 2423424242,
    correo: 'ajosep2@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Pedro',
    apellido: 'sanchez',
    tipoDocumento: 'DNI',
    documento: 2423424242,
    correo: 'ajosep3@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Pedro',
    apellido: 'sanchez',
    tipoDocumento: 'DNI',
    documento: 2423424242,
    correo: 'ajosep4@gmail.com',
    fechaNacimiento: new Date(),
  },
  {
    nombre: 'Pedro',
    apellido: 'sanchez',
    tipoDocumento: 'DNI',
    documento: 2423424242,
    correo: 'ajosep5@gmail.com',
    fechaNacimiento: new Date(),
  },
];
@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css'],
})
export class ListPersonasComponent implements OnInit, AfterViewInit {
  listado:boolean=false;
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'correo',
    'tipoDocumento',
    'documento',
    'fechaNacimiento',
    'Acciones',
  ];
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(listPersonas);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  agregarDialog() {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      data: { estado: 'agregar' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        listPersonas.push(result.valor);
        console.log(listPersonas);
        this.dataSource.data = listPersonas;
      } else console.log('The dialog was closed');
    });
  }
  edit(data: any) {
    console.log('mi row', data);
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      data: { estado: 'edit', data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.buscarIndice(result);
      } else console.log('The dialog was closed');
    });
    //this.dataSource = new MatTableDataSource(listPersonas);
  }

  buscarIndice(result: any) {
    console.log(listPersonas);
    const indice = listPersonas.findIndex((el) => {
      return el.correo == result.valor.correo;
    });

    console.log('persona', listPersonas[indice]);
    listPersonas[indice].nombre = result.valor.nombre;
    listPersonas[indice].apellido = result.valor.apellido;
    listPersonas[indice].documento = result.valor.documento;
    listPersonas[indice].tipoDocumento = result.valor.tipoDocumento;
    listPersonas[indice].fechaNacimiento = result.valor.fechaNacimiento;
  }
  delete(result: any) {
    const indice = listPersonas.findIndex((el) => {
      return el.correo == result;
    });
    console.log('indice delete', indice);
    if (indice !== -1) listPersonas.splice(indice, 1);
    this.dataSource.data = listPersonas;
  }
  mipagina(event:PageEvent){
    console.log(event)

  }
  entrar(){
    this.listado=true
  }
}
