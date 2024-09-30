import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InventarioHilo } from '../../../interfaces/balance-masas';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css'
})
export class DialogsComponent {
  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log(data);
    //this.dataSourceInventarioInicioSubProducto = new MatTableDataSource(this.data.data);
  }

  ColumnsInventarioIS: string[] = ['lote', 'kg'];
  dataSourceInventarioInicioSubProducto = new MatTableDataSource<InventarioHilo>();
  dataSouceIngresoSubProducto = new MatTableDataSource<InventarioHilo>();
  dataSouceSalidaSubProducto = new MatTableDataSource<InventarioHilo>();
  dataSouceInventarioFinSubProducto = new MatTableDataSource<InventarioHilo>();
  

    // CONTROLAR DATOS DE CARGA EN INTERFAZ
    loadingIngresosSubproducto: boolean = false;

  cargarInventarioInicioSubProducto() {
    this._consumoProvedorService.getInvInicioSubProducto(this.data.data).subscribe(data =>{
      this.dataSourceInventarioInicioSubProducto.data = data
    });
  }

  cargarIngresoSubProducto() {
    this._consumoProvedorService.getIngresoSubProducto(this.data.data).subscribe(data =>{
      this.dataSouceIngresoSubProducto.data = data
    });
  }

  cargarSalidaSubProducto() {
    this._consumoProvedorService.getSalidaSubProducto(this.data.data).subscribe(data =>{
      this.dataSouceSalidaSubProducto.data = data
    });
  }

  cargarInventarioFinSubProducto() {
    this._consumoProvedorService.getInvFinSubProducto(this.data.data).subscribe(data =>{
      this.dataSouceInventarioFinSubProducto.data = data
    });
  }

  ngOnInit(): void {
    this.cargarInventarioInicioSubProducto();
    this.cargarIngresoSubProducto();
    this.cargarSalidaSubProducto();
    this.cargarInventarioFinSubProducto();
  }

  agregarComaMiles(numero: number): string {
    // Convertir el número a cadena de texto y dividirlo en parte entera y parte decimal
    let numeroFormateado = numero.toFixed(2).toString();
    const partes = numeroFormateado.split('.');
  
    // Eliminar .00 si el número es un número entero
    if (partes[1] === '00') {
      numeroFormateado = partes[0];
    }
  
    // Agregar la coma de miles a la parte entera
    numeroFormateado = numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Devolver la cadena formateada
    return numeroFormateado;
  }

  cargarIngresosSubproducto(){
    this.loadingIngresosSubproducto = true;
    this._consumoProvedorService.getIngresoSubProducto(this.data.value).subscribe(data =>{
      this.dataSouceIngresoSubProducto.data = data
      this.loadingIngresosSubproducto = false;
    }, (error: any) => {
      this.loadingIngresosSubproducto = false;
      console.error('Ocurrió un error al obtener datos de ingreso subproducto:', error);
    });
  }

}
