import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import { ConsumoProveedorCompleto } from '../../../../interfaces/balance-masas';
import { UtilidadService } from '../../../../services/utilidad.service';

@Component({
  selector: 'app-consumo-proveedor-completo',
  templateUrl: './consumo-proveedor-completo.component.html',
  styleUrl: './consumo-proveedor-completo.component.css'
})
export class ConsumoProveedorCompletoComponent implements OnInit{

  value = 'Clear me';
  dataSourceConsumoProveedorCompleto = new MatTableDataSource<ConsumoProveedorCompleto>();
  displayedColumns: string[] = ['fecha','bodega','articulo','desc_articulo',
    'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia','proveedor',
    'descripcion_articulo','lote'];
  public lote_madre!: string;

     // CONTROLAR DATOS DE CARGA EN INTERFAZ
     loadingConsumoProveedorCompleto: boolean = false;
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,
  private _consumoProvedorService: ConsumoProveedorServiceService,
  private _utilidadServicio: UtilidadService) {
   this.dataSourceConsumoProveedorCompleto = new MatTableDataSource(this.data.data);
   this.lote_madre = data.data;
   console.log('lote dato', this.lote_madre);
  }


  ngOnInit(): void {
    this.cargarDatosConsumoProveedor();
  }



  cargarDatosConsumoProveedor(){
    this.loadingConsumoProveedorCompleto = true;
    this._consumoProvedorService.getConsumoProveedorCompleto(this.lote_madre).subscribe(data =>{
      this.dataSourceConsumoProveedorCompleto.data = data
      this.loadingConsumoProveedorCompleto = false;
    }, (error: any) => {
      this.loadingConsumoProveedorCompleto = false;
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

  removeNewlinesAndExtraSpaces(text: string): string {
    return text.replace(/[\n\t\r]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  }


  async exportar() {
    if (this.dataSourceConsumoProveedorCompleto.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha','bodega','articulo','desc_articulo',
      'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia','proveedor',
      'descripcion_articulo','lote'];
    const data =  await this._utilidadServicio.formatoConsumoProveedorCompleto(this.dataSourceConsumoProveedorCompleto);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'consumo_proveedor_completo(lote_madre:' + this.lote_madre + ')');
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

}
