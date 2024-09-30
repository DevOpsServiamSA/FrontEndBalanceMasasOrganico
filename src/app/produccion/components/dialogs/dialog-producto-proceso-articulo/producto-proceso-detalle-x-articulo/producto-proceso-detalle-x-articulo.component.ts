import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleHiloxArticulo, ProductoProcesoDetallexArticulo } from '../../../../interfaces/balance-masas';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilidadService } from '../../../../services/utilidad.service';
import { ConsumoProveedorServiceService } from '../../../../services/consumo-proveedor-service.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-producto-proceso-detalle-x-articulo',
  templateUrl: './producto-proceso-detalle-x-articulo.component.html',
  styleUrl: './producto-proceso-detalle-x-articulo.component.css'
})
export class ProductoProcesoDetalleXArticuloComponent implements OnInit{
  public lote_madre!: string;
  public articulo!:string;

  ColumnsDetalleHiloConsumo: string[] = ['lote_hijo','fecha','articulo','descripcion',  'cantidad'];
  dataSourceProductoProcesoxArticulo = new MatTableDataSource<ProductoProcesoDetallexArticulo>();

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
loadingProductoProcesoxArticulo: boolean = false;


  constructor(public dialog: MatDialog
    ,private _utilidadServicio: UtilidadService,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data_lote_madre;
      this.articulo = data.data_articulo;
      //console.log(this.lote_madre);
      //console.log(this.data.dato3);
  }


  ngOnInit(): void {
    this.cargarDatosProductoProcesoDetallexArticulo();
  }



  cargarDatosProductoProcesoDetallexArticulo(){
    this.loadingProductoProcesoxArticulo = true;
    this._consumoProvedorService.getProductoProcesoDetallexArticulo(this.data.data_lote_madre,this.data.data_articulo).subscribe(data =>{
      this.dataSourceProductoProcesoxArticulo.data = data
      this.loadingProductoProcesoxArticulo = false;
    }, (error: any) => {
      this.loadingProductoProcesoxArticulo = false;
      console.error('Ocurrió un error al obtener las guías de remisión:', error);
    });
  }


  async exportTableToExcel() {
    if (this.dataSourceProductoProcesoxArticulo.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['lote_hijo','fecha','articulo','descripcion',  'cantidad'];
    const data =  await this._utilidadServicio.formatoDetalleHiloxArticulo(this.dataSourceProductoProcesoxArticulo);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'Detalle_Hilo_x_articulo' + this.lote_madre + ')');
  }


  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
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

  getTotalKG(): number {
    return this.dataSourceProductoProcesoxArticulo.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

}
