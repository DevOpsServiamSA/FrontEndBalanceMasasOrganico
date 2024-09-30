import { Component, Inject, OnInit } from '@angular/core';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoProcesoxArticulo, SubProductoConcepto } from '../../../interfaces/balance-masas';
import { ProductoProcesoDetalleXArticuloComponent } from './producto-proceso-detalle-x-articulo/producto-proceso-detalle-x-articulo.component';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';
import { DialogConsumoHiloTodosComponent } from '../dialog-consumo-hilo-detalle/dialog-consumo-hilo-todos/dialog-consumo-hilo-todos.component';
import { DialogProductoProcesoTodosComponent } from './dialog-producto-proceso-todos/dialog-producto-proceso-todos.component';


@Component({
  selector: 'app-dialog-producto-proceso-articulo',
  templateUrl: './dialog-producto-proceso-articulo.component.html',
  styleUrl: './dialog-producto-proceso-articulo.component.css'
})
export class DialogProductoProcesoArticuloComponent implements OnInit{

  public lote_madre!: string;
  loadingProductoProceso: boolean = false;

  displayedColumns: string[] = ['articulo','descripcion','cantidad']
  dataSourceProductoProceso = new MatTableDataSource<ProductoProcesoxArticulo>();
  

  constructor(private _consumoProvedorService: ConsumoProveedorServiceService,
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.cargarProductoProcesoxArticulo(data.data);
      console.log(this.lote_madre);
  }


  ngOnInit(): void {
    this.cargarProductoProceso();
  }


  cargarProductoProceso(){
    this.loadingProductoProceso = true;
    this._consumoProvedorService.getProductoProcesoxArticulo(this.lote_madre).subscribe(data =>{
      this.dataSourceProductoProceso.data = data
      this.loadingProductoProceso = false;
    }, (error: any) => {
      this.loadingProductoProceso = false;
      console.error('Ocurrió un error al obtener datos de resumen de consumo:', error);
    });
  }

  cargarProductoProcesoxArticulo(lote_madre: string) {
    this._consumoProvedorService.getProductoProcesoxArticulo(lote_madre).subscribe(data =>{
      this.dataSourceProductoProceso.data = data
    });
  }


  openDialogDetalleSubProducto(rowData: any){
    const dialogRef = this.dialog.open(ProductoProcesoDetalleXArticuloComponent, {
      data:{data_lote_madre: this.lote_madre,
           data_articulo: rowData.articulo},
      width:'3500px'
      //height:'1000px'
    });
    dialogRef.afterClosed().subscribe(resourceLimits => {
      console.log('Dialog');
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

  getTotalKG(): number {
    return this.dataSourceProductoProceso.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }


  VerProductoProcesoTodos(){
    const dialogRef = this.dialog.open(DialogProductoProcesoTodosComponent, {
      data:{data: this.lote_madre},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


  async exportTableToExcel() {
    if (this.dataSourceProductoProceso.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['articulo','descripcion','cantidad']
    const data =  await this._utilidadServicio.formatoProductoProceso(this.dataSourceProductoProceso);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'Producto en proceso(lote_madre:' + this.lote_madre + ')');
  }

}
