import { Component, Inject, OnInit } from '@angular/core';
import { UtilidadService } from '../../../services/utilidad.service';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleHiloxArticulo, DetalleIngresoHilo, ProductoProcesoDetallexArticulo, SubProductoDetallexArticulo } from '../../../interfaces/balance-masas';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dialog-consumo-subproducto',
  templateUrl: './dialog-consumo-subproducto.component.html',
  styleUrl: './dialog-consumo-subproducto.component.css'
})
export class DialogConsumoSubproductoComponent implements OnInit {

  public lote_madre!: string;
  public articulo!:string;
  public naturalezaNumero!:string;
  
  constructor(private _utilidadServicio: UtilidadService,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.articulo = data.dato2;

   

      this.cargarDetalleConsumoSubProducto(data.data,this.articulo);
      console.log(this.articulo);

  }
  ngOnInit(): void {
    this.loadDatos();
  }

  ColumnsDetalleSubProductoConsumo: string[] = ['fecha','lote_hijo','articulo','descripcion','cantidad'];
  dataSourceDetalleSubProductoConsumo = new MatTableDataSource<SubProductoDetallexArticulo>();


  cargarDetalleConsumoSubProducto(lote_madre: string,naturaleza: string) {
    this._consumoProvedorService.getDetalleConsumoSubProducto(lote_madre,this.articulo).subscribe(data =>{
      this.dataSourceDetalleSubProductoConsumo.data = data
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
    
    return `${day}/${month}/${year}`;
  }

  async exportTableToExcel() {
    if (this.dataSourceDetalleSubProductoConsumo.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha','lote_hijo','articulo','descripcion','cantidad'];
    const data =  await this._utilidadServicio.formatoDetalleHiloxArticulo(this.dataSourceDetalleSubProductoConsumo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_salida_hilo_(lote_madre:' + this.lote_madre + ')');
  }

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
loadingDetalleConsumoSubProducto: boolean = false;

loadDatos() {
  this.cargarDatosDetalleConsumoSubProducto();
}

cargarDatosDetalleConsumoSubProducto(){
  this.loadingDetalleConsumoSubProducto = true;
  this._consumoProvedorService.getDetalleConsumoSubProducto(this.lote_madre,this.articulo).subscribe(data =>{
    this.dataSourceDetalleSubProductoConsumo.data = data
    this.loadingDetalleConsumoSubProducto = false;
  }, (error: any) => {
    this.loadingDetalleConsumoSubProducto = false;
    console.error('Ocurrió un error al obtener el detalle de consumo subproducto:', error);
  });
}

getTotalKG(): number {
  return this.dataSourceDetalleSubProductoConsumo.data
    .map((t: any) => t.cantidad)
    .reduce((acc: number, value: number) => acc + value, 0);
}

}
