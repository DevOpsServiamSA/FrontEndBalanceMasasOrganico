import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { DetalleHiloTodos, DetalleMovimientoIngresoHilo } from '../../../../interfaces/balance-masas';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../../services/utilidad.service';

@Component({
  selector: 'app-dialog-consumo-hilo-todos',
  templateUrl: './dialog-consumo-hilo-todos.component.html',
  styleUrl: './dialog-consumo-hilo-todos.component.css'
})
export class DialogConsumoHiloTodosComponent implements OnInit{

  value = 'Clear me';
  dataSourceConsumoHiloTodos = new MatTableDataSource<DetalleHiloTodos>();
  displayedColumns: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
    'cantidad','consecutivo','desc_consecutivo','descripcion_articulo','aplicacion','referencia'];
  public lote_madre!: string;

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingConsumoHiloTodos: boolean = false;
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,
  private _consumoProvedorService: ConsumoProveedorServiceService,
  private _utilidadServicio: UtilidadService) {
   this.dataSourceConsumoHiloTodos = new MatTableDataSource(this.data.data);
   this.lote_madre = data.data;
  }



  ngOnInit(): void {
    this.cargarDatosConsumoHilo();
  }



  cargarDatosConsumoHilo(){
    this.loadingConsumoHiloTodos = true;
    this._consumoProvedorService.getDetalleConsumoHiloTodos(this.lote_madre).subscribe(data =>{
      this.dataSourceConsumoHiloTodos.data = data
      this.loadingConsumoHiloTodos = false;
    }, (error: any) => {
      this.loadingConsumoHiloTodos = false;
      console.error('Ocurrió un error al obtener los proveedores:', error);
    });
  }

  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
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
    if (this.dataSourceConsumoHiloTodos.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
    'cantidad','consecutivo','desc_consecutivo','descripcion_articulo','aplicacion','referencia'];
    const data =  await this._utilidadServicio.formatoDetalleHiloTodos(this.dataSourceConsumoHiloTodos);

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

}
