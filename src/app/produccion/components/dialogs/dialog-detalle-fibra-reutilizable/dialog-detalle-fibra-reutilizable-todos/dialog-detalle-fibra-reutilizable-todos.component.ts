import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../../services/utilidad.service';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { DetalleFibraReutilizable } from '../../../../interfaces/balance-masas';

@Component({
  selector: 'app-dialog-detalle-fibra-reutilizable-todos',
  templateUrl: './dialog-detalle-fibra-reutilizable-todos.component.html',
  styleUrl: './dialog-detalle-fibra-reutilizable-todos.component.css'
})
export class DialogDetalleFibraReutilizableTodosComponent implements OnInit{
  value = 'Clear me';
  dataSourceDetalleFibra = new MatTableDataSource<DetalleFibraReutilizable>();
  displayedColumns: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','descripcion','cantidad','consecutivo','desc_consecutivo','referencia','observacion'];
  public lote_madre!: string;
  public articulo!: string;

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingDetalleFibra: boolean = false;
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,
  private _consumoProvedorService: ConsumoProveedorServiceService,
  private _utilidadServicio: UtilidadService) {
   this.dataSourceDetalleFibra = new MatTableDataSource(this.data.data);
   this.lote_madre = data.data;
   this.articulo = this.data.parametro_articulo;
   console.log("LOTE MADRE", this.data.parametro_articulo)
}


  ngOnInit(): void {
    this.cargarDatosDetalleFibraReutilizable();
  }




cargarDatosDetalleFibraReutilizable(){
  this.loadingDetalleFibra = true;
  this._consumoProvedorService.getDetalleFibraReutilizable(this.lote_madre,this.data.parametro_articulo).subscribe(data =>{
    this.dataSourceDetalleFibra.data = data
    this.loadingDetalleFibra = false;
  }, (error: any) => {
    this.loadingDetalleFibra = false;
    console.error('Ocurrió un error al obtener los proveedores:', error);
  });
}


getTotalKG(): number {
  return this.dataSourceDetalleFibra.data
    .map((t: any) => t.cantidad)
    .reduce((acc: number, value: number) => acc + value, 0);
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





async exportTableToExcel() {
  if (this.dataSourceDetalleFibra.data.length <= 0) {
    this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
    return;
  }
  
  const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','descripcion','cantidad','consecutivo','desc_consecutivo','referencia','observacion'];
  const data =  await this._utilidadServicio.formatoDetalleFibraReutilizable(this.dataSourceDetalleFibra);

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Genera el archivo Excel (en formato xlsx)
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this._utilidadServicio.saveAsExcelFile(excelBuffer, 'fibra reutilizable(lote_madre:' + this.lote_madre + ')');
}


formatDate(date: string): string {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}


}
