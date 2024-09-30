import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumoProductoProcesoTodos, DetalleIngresoHilo } from '../../../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../../services/utilidad.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-subproducto-todos',
  templateUrl: './dialog-subproducto-todos.component.html',
  styleUrl: './dialog-subproducto-todos.component.css'
})
export class DialogSubproductoTodosComponent implements OnInit{
  dataSourceExportarDetalleTodo = new MatTableDataSource<ConsumoProductoProcesoTodos>();
  ColumnsDetalleTodo: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
  'tipo','naturaleza','descripcion_articulo','cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];


  public lote_madre!: string;
  public naturaleza_concepto!: string;
  loadingDetalleConsumoSubProducto: boolean = false;


  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.naturaleza_concepto = data.naturaleza;
      this.cargarDetalleConsumoSubProductoTodos(data.data,this.naturaleza_concepto)
      console.log(this.lote_madre);
      console.log(this.naturaleza_concepto);
    }


  ngOnInit(): void {
    this.cargarDatosDetalleSubproductoTodos();
  }

    cargarDetalleConsumoSubProductoTodos(lote_madre: string,naturaleza: string) {
      this._consumoProvedorService.getSubProductoConsumoTodos(lote_madre).subscribe(data =>{
        this.dataSourceExportarDetalleTodo.data = data
      });
    }


    cargarDatosDetalleSubproductoTodos(){
      this.loadingDetalleConsumoSubProducto = true;
      this._consumoProvedorService.getSubProductoConsumoTodos(this.lote_madre).subscribe(data =>{
        this.dataSourceExportarDetalleTodo.data = data
        this.loadingDetalleConsumoSubProducto = false;
      }, (error: any) => {
        this.loadingDetalleConsumoSubProducto = false;
        console.error('Ocurrió un error al obtener el detalle de consumo subproducto:', error);
      });
    }


    async exportTableToExcel() {
      if (this.dataSourceExportarDetalleTodo.data.length <= 0) {
        this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
        return;
      }
      
      const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
      'tipo','naturaleza','descripcion_articulo','cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];
      const data =  await this._utilidadServicio.formatoDetalleConsumoProductoProcesoTodos(this.dataSourceExportarDetalleTodo);
  
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // Genera el archivo Excel (en formato xlsx)
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_sup_producto_todos(lote_madre:' + this.lote_madre + ')');
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
    
    return `${day}/${month}/${year}`;
  }

  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
  }

}
