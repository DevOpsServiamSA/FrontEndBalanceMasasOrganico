import { Component, Inject, OnInit } from '@angular/core';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetalleIngresoHilo } from '../../../interfaces/balance-masas';
import { MatTableDataSource } from '@angular/material/table';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';
import { DialogDetalleHiloXLoteHijoComponent } from './dialog-detalle-hilo-x-lote-hijo/dialog-detalle-hilo-x-lote-hijo.component';
import { DialogConsumoHiloTodosComponent } from './dialog-consumo-hilo-todos/dialog-consumo-hilo-todos.component';

@Component({
  selector: 'app-dialog-consumo-hilo-detalle',
  templateUrl: './dialog-consumo-hilo-detalle.component.html',
  styleUrl: './dialog-consumo-hilo-detalle.component.css'
})
export class DialogConsumoHiloDetalleComponent implements OnInit{
  public lote_madre!: string;
  public lote_hijo!: string;
  public consecutivo!:string;
  mostrarLoteHijo: boolean = false;


    // Método para cambiar la visibilidad de la columna
    /*toggleLoteHijoColumn() {
      this.mostrarLoteHijo = !this.mostrarLoteHijo;
      this.ColumnsDetalleHiloConsumo = this.mostrarLoteHijo ? ['articulo', 'lote_hijo', 'desc_articulo', 'cantidad'] : ['articulo', 'desc_articulo', 'cantidad'];
    }*/

  constructor(public dialog: MatDialog
    ,private _utilidadServicio: UtilidadService,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.cargarDetalleConsumoHilo(data.data);
      //console.log(this.lote_madre);
      //console.log(this.data.dato3);
  }

  loadDialogDetalleHiloxArticulo(rowData : any){
    const dialogRef = this.dialog.open(DialogDetalleHiloXLoteHijoComponent, {
      data:{data_lote_madre: this.lote_madre,
           data_articulo: rowData.articulo,
           data_lote_hijo: rowData.lote_hijo},
      width:'3500px'
      //height:'1000px'
    });
    dialogRef.afterClosed().subscribe(resourceLimits => {
      console.log('Dialog');
    });
  }



  ngOnInit(): void {
    this.cargarDatosDetalleConsumoHilo();
  }
  ColumnsDetalleHiloConsumo: string[] = ['articulo', 'desc_articulo', 'cantidad'];
  dataSourceDetalleHiloConsumo = new MatTableDataSource<DetalleIngresoHilo>();


  cargarDetalleConsumoHilo(lote_madre: string) {
    this._consumoProvedorService.getDetalleConsumoHilo(lote_madre).subscribe(data =>{
      this.dataSourceDetalleHiloConsumo.data = data
    });
  }
// CONTROLAR DATOS DE CARGA EN INTERFAZ
loadingDetalleConsumoHilo: boolean = false;


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

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  loadDatos() {
    this.cargarDatosDetalleConsumoHilo();
  }

  cargarDatosDetalleConsumoHilo(){
    this.loadingDetalleConsumoHilo = true;
    this._consumoProvedorService.getDetalleConsumoHilo(this.lote_madre).subscribe(data =>{
      this.dataSourceDetalleHiloConsumo.data = data
      this.loadingDetalleConsumoHilo = false;
    }, (error: any) => {
      this.loadingDetalleConsumoHilo = false;
      console.error('Ocurrió un error al obtener el detalle de consumo hilo:', error);
    });
  }

  async exportTableToExcel() {
    if (this.dataSourceDetalleHiloConsumo.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['articulo','lote_hijo','desc_articulo','cantidad'];
    const data =  await this._utilidadServicio.copyAndFormatData(this.dataSourceDetalleHiloConsumo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_hilo_articulo' + this.lote_madre + ')');
  }

  VerConsumoHiloTodos(){
    const dialogRef = this.dialog.open(DialogConsumoHiloTodosComponent, {
      data:{data: this.lote_madre},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }

  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
  }


  getTotalKG(): number {
    return this.dataSourceDetalleHiloConsumo.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

}
