import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleFibraReutilizable, DetalleFibraReutilizableXArticulo } from '../../../interfaces/balance-masas';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../services/utilidad.service';
import { DialogDetalleFibraReutilizableXArticuloComponent } from './dialog-detalle-fibra-reutilizable-x-articulo/dialog-detalle-fibra-reutilizable-x-articulo.component';
import { DialogDetalleFibraReutilizableTodosComponent } from './dialog-detalle-fibra-reutilizable-todos/dialog-detalle-fibra-reutilizable-todos.component';

@Component({
  selector: 'app-dialog-detalle-fibra-reutilizable',
  templateUrl: './dialog-detalle-fibra-reutilizable.component.html',
  styleUrl: './dialog-detalle-fibra-reutilizable.component.css'
})
export class DialogDetalleFibraReutilizableComponent implements OnInit{
  value = 'Clear me';
  dataSourceDetalleFibra = new MatTableDataSource<DetalleFibraReutilizableXArticulo>();
  displayedColumns: string[] = ['articulo','descripcion','cantidad'];
  public lote_madre!: string;

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingDetalleFibra: boolean = false;
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,
  private _consumoProvedorService: ConsumoProveedorServiceService,
  private _utilidadServicio: UtilidadService) {
   //this.dataSourceDetalleFibra = new MatTableDataSource(this.data.data);
   this.lote_madre = data.data;
   console.log("LOTE MADRE", this.lote_madre)
}



  ngOnInit(): void {
    this.cargarDatosDetalleFibraReutilizable();
  }


cargarDatosDetalleFibraReutilizable(){
  this.loadingDetalleFibra = true;
  this._consumoProvedorService.getDetalleFibraReutilizablexArticulo(this.lote_madre).subscribe(data =>{
    this.dataSourceDetalleFibra.data = data
    this.loadingDetalleFibra = false;
  }, (error: any) => {
    this.loadingDetalleFibra = false;
    console.error('Ocurrió un error al obtener los proveedores:', error);
  });
}



loadDialogDetalleFibraReutilizable(rowData : any){
  const dialogRef = this.dialog.open(DialogDetalleFibraReutilizableXArticuloComponent, {
    data:{data_lote_madre: this.data.data,
         data_articulo: rowData.articulo},
    width:'3500px'
  });
  dialogRef.afterClosed().subscribe(resourceLimits => {
    console.log('Dialog');
  });
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


VerDetalleFibraReutilizableTodos(){
  const dialogRef = this.dialog.open(DialogDetalleFibraReutilizableTodosComponent, {
    data:{
      data: this.lote_madre,
      parametro_articulo: 'ND'},
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


async exportTableToExcel() {
  if (this.dataSourceDetalleFibra.data.length <= 0) {
    this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
    return;
  }
  
  const header = ['articulo','descripcion','cantidad'];
  const data =  await this._utilidadServicio.formatoDetalleFibraReutilizablexArticulo(this.dataSourceDetalleFibra);

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Genera el archivo Excel (en formato xlsx)
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this._utilidadServicio.saveAsExcelFile(excelBuffer, 'consumo_hilo_todos(lote_madre:' + this.lote_madre + ')');
}


formatDate(date: string): string {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}


getTotalKG(): number {
  return this.dataSourceDetalleFibra.data
    .map((t: any) => t.cantidad)
    .reduce((acc: number, value: number) => acc + value, 0);
}

}
