import { Component, Inject, OnInit } from '@angular/core';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleIngresoHilo, DetalleMovimientoIngresoHilo } from '../../../interfaces/balance-masas';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-detalle-ingreso-hilo',
  templateUrl: './dialog-detalle-ingreso-hilo.component.html',
  styleUrl: './dialog-detalle-ingreso-hilo.component.css'
})
export class DialogDetalleIngresoHiloComponent implements OnInit {
  public lote_madre!: string;
  public lote_hijo!: string;
  public consecutivo!:string;
  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.lote_hijo = data.rowData;
      this.consecutivo = data.dato3;
      this.cargarDetalleIngresoHilo(data.data, data.rowData.lote, data.dato3);
      console.log(this.lote_madre);
      //console.log(this.data.dato3);
  }
  ColumnsDetalleIngresoHilo: string[] = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
  'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];
  dataSourceDetalleIngresoHilo = new MatTableDataSource<DetalleMovimientoIngresoHilo>();

  ngOnInit(): void {
    this.loadDatos();
  }


  cargarDetalleIngresoHilo(lote_madre: string, lote_hijo: string, consecutivo: string) {
    this._consumoProvedorService.getDetalleIngresoHilo(lote_madre,this.lote_hijo,this.data.dato3).subscribe(data =>{
      this.dataSourceDetalleIngresoHilo.data = data
    });
  }

  async exportTableToExcel() {
    if (this.dataSourceDetalleIngresoHilo.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
    'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia'];
    const data =  await this._utilidadServicio.formatoDetalleMovimientoHilo(this.dataSourceDetalleIngresoHilo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_ingreso_hilo_(lote_madre:' + this.lote_madre + ')');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDetalleIngresoHilo.filter = filterValue.trim().toLowerCase();
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  
  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingDetalleIngresoHilos: boolean = false;

  loadDatos() {
    this.cargarDatosDetalleIngresoHilos();
  }


  cargarDatosDetalleIngresoHilos(){
    this.loadingDetalleIngresoHilos = true;
    this._consumoProvedorService.getDetalleIngresoHilo(this.lote_madre,this.lote_hijo,this.data.dato3).subscribe(data =>{
      this.dataSourceDetalleIngresoHilo.data = data
      this.loadingDetalleIngresoHilos = false;
    }, (error: any) => {
      this.loadingDetalleIngresoHilos = false;
      console.error('Ocurrió un error al obtener el detalle de consumo subproducto:', error);
    });
  }

  getTotalKG(): number {
    return this.dataSourceDetalleIngresoHilo.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

}
