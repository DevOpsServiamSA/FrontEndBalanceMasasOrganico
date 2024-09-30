import { Component, Inject, OnInit } from '@angular/core';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../../services/utilidad.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleIngresoHilo } from '../../../../interfaces/balance-masas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-resumen-consecutivo-salida-todos',
  templateUrl: './dialog-resumen-consecutivo-salida-todos.component.html',
  styleUrl: './dialog-resumen-consecutivo-salida-todos.component.css'
})
export class DialogResumenConsecutivoSalidaTodosComponent implements OnInit{
  dataSourceExportarDetalleSalidaTodo = new MatTableDataSource<DetalleIngresoHilo>();
  ColumnsDetalleTodo: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
  'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];

  public lote_madre!: string;
  public lote_hijo!: string;
  public consecutivo!: string;
  loadingDetalleSalida: boolean = false;

  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.lote_hijo = data.data2;
      this.consecutivo = data.dato3;
      this.cargarDetalleSalidaHilo(data.data,this.lote_hijo,this.consecutivo)
    
    }
  ngOnInit(): void {
    this.cargarDatosDetalleSalidaHiloTodos();
  }


    cargarDetalleSalidaHilo(lote_madre: string, lote_hijo: string, consecutivo: string) {
      this._consumoProvedorService.getDetalleSalidaHilo(lote_madre,this.lote_hijo,this.consecutivo).subscribe(data =>{
        this.dataSourceExportarDetalleSalidaTodo.data = data
      });
    }


  cargarDatosDetalleSalidaHiloTodos(){
    this.loadingDetalleSalida = true;
    this._consumoProvedorService.getDetalleSalidaHilo(this.lote_madre,this.lote_hijo,this.consecutivo).subscribe(data =>{
      this.dataSourceExportarDetalleSalidaTodo.data = data
      this.loadingDetalleSalida = false;
    }, (error: any) => {
      this.loadingDetalleSalida = false;
      console.error('Ocurrió un error al obtener el detalle de consumo subproducto:', error);
    });
  }


  async exportTableToExcel() {
    if (this.dataSourceExportarDetalleSalidaTodo.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
    'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];
    const data =  await this._utilidadServicio.copyAndFormatData(this.dataSourceExportarDetalleSalidaTodo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_ingreso_hilo_todos(lote_madre:' + this.lote_madre + ')');
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


formatDate(date: string): string {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}-${month}-${year}`;
}

}
