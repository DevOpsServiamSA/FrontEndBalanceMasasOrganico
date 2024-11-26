import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleIngresoHilo } from '../../../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../../services/utilidad.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-resumen-consecutivo-todos',
  templateUrl: './dialog-resumen-consecutivo-todos.component.html',
  styleUrl: './dialog-resumen-consecutivo-todos.component.css'
})
export class DialogResumenConsecutivoTodosComponent implements OnInit{
  dataSourceExportarDetalleIngresoTodo = new MatTableDataSource<DetalleIngresoHilo>();
  ColumnsDetalleTodo: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
  'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];

  public lote_madre!: string;
  public lote_hijo!: string;
  public consecutivo!: string;
  loadingDetalleIngreso: boolean = false;
  selectedFile: File | null = null;
  loading:boolean = false;
  isUploading: boolean = false; // Nueva variable para controlar el estado de carga


  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.lote_hijo = data.data2;
      this.consecutivo = data.dato3;
      //this.cargarDetalleIngresoHiloTodos(data.data,this.lote_hijo,this.consecutivo)
    
    }
  ngOnInit(): void {
    this.cargarDatosDetalleIngresoHiloTodos();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Almacenar el archivo seleccionado
    }
  }

  uploadExcel(): void {    
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo');
      return;
    }
    // Deshabilitar el botón durante la carga
    this.isUploading = true;
    this.loading = true;
    // Enviar el archivo al servicio
    this._consumoProvedorService.guardarExcel([this.selectedFile])
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        alert('Datos cargados y guardados exitosamente.');
        this.isUploading = false;
        this.loading = false;
        this.cargarDatosDetalleIngresoHiloTodos();
      },
      error: (err) => {
        console.error('Error al cargar el archivo', err);
        alert('Error al cargar el archivo.');
        this.isUploading = false; // Habilitar el botón nuevamente
      },
    });
  }




   /* cargarDetalleIngresoHiloTodos(lote_madre: string, lote_hijo: string, consecutivo: string) {
      this._consumoProvedorService.getDetalleIngresoHilo().subscribe(data =>{
        this.dataSourceExportarDetalleIngresoTodo.data = data
      });
    }*/


    cargarDatosDetalleIngresoHiloTodos(){
      this.loadingDetalleIngreso = true;
      this._consumoProvedorService.getDetalleIngresoHilo().subscribe(data =>{
        this.dataSourceExportarDetalleIngresoTodo.data = data
        this.loadingDetalleIngreso = false;
      }, (error: any) => {
        this.loadingDetalleIngreso = false;
        console.error('Ocurrió un error al obtener el detalle de consumo subproducto:', error);
      });
    }


    async exportTableToExcel() {
      if (this.dataSourceExportarDetalleIngresoTodo.data.length <= 0) {
        this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
        return;
      }
      
      const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
      'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];
      const data =  await this._utilidadServicio.copyAndFormatData(this.dataSourceExportarDetalleIngresoTodo);
  
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
