import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
  maxdata!:Date;
form:FormGroup;
  constructor(private fb:FormBuilder,
    public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
this.form=this.fb.group({
  nombre:['',Validators.required],
  apellido:['',Validators.required],
  correo:['',[Validators.required, Validators.email]],
  tipoDocumento:[null,Validators.required],
  documento:[null,[Validators.required,Validators.pattern("^[0-9]*$")]],
  fechaNacimiento:[null,Validators.required]
})

   }

  ngOnInit(): void {
   this.maxdata=new Date();
if(this.data.data){
  this.form.controls['nombre'].setValue(this.data.data.nombre)
  this.form.controls['correo'].setValue(this.data.data.correo)
  this.form.controls['apellido'].setValue(this.data.data.apellido)
  this.form.controls['documento'].setValue(this.data.data.documento)
  this.form.controls['tipoDocumento'].setValue(this.data.data.tipoDocumento)
  this.form.controls['fechaNacimiento'].setValue(this.data.data.fechaNacimiento)
}


  }
cancelar(){
  this.dialogRef.close();
}
aceptar(){
 console.log(this.form)
}
}
