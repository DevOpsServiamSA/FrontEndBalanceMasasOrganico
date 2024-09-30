import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilidadService } from '../../../../services/utilidad.service';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleHiloXLoteHijo, DetalleIngresoHilo } from '../../../../interfaces/balance-masas';
import * as XLSX from 'xlsx';
import { DialogDetalleHiloXArticuloComponent } from '../../dialog-detalle-hilo-x-articulo/dialog-detalle-hilo-x-articulo.component';

@Component({
  selector: 'app-dialog-detalle-hilo-x-lote-hijo',
  templateUrl: './dialog-detalle-hilo-x-lote-hijo.component.html',
  styleUrl: './dialog-detalle-hilo-x-lote-hijo.component.css'
})
export class DialogDetalleHiloXLoteHijoComponent {
  public lote_madre!: string;
  public lote_hijo!: string;
  public articulo!: string;

  ColumnsDetalleHiloConsumo: string[] = ['lote_hijo','articulo','descripcion',  'cantidad'];
  dataSourceDetalleHiloConsumo = new MatTableDataSource<DetalleHiloXLoteHijo>();

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
loadingDetalleConsumoHilo: boolean = false;

  constructor(public dialog: MatDialog
    ,private _utilidadServicio: UtilidadService,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data_lote_madre;
      this.articulo = data.data_articulo;
      this.lote_hijo = data.data_lote_hijo;      
      this.cargarDetalleConsumoHilo(data.data,data.data_articulo,data.lote_hijo);

      //console.log(this.lote);
  }



  loadDialogDetallexLoteHijo(rowData : any){
    const dialogRef = this.dialog.open(DialogDetalleHiloXArticuloComponent, {
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

  cargarDetalleConsumoHilo(lote_madre: string, articulo: string, lote_hijo: string) {
    this._consumoProvedorService.getDetalleHiloxLoteHijo(this.lote_madre,articulo).subscribe(data =>{
      this.dataSourceDetalleHiloConsumo.data = data
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
    this._consumoProvedorService.getDetalleHiloxLoteHijo(this.lote_madre,this.articulo).subscribe(data =>{
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
    
    const header = ['articulo','lote_hijo','descripcion','cantidad'];
    const data =  await this._utilidadServicio.formatoExportarLoteHijoHilo(this.dataSourceDetalleHiloConsumo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_hilo_articulo' + this.lote_madre + ')');
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
