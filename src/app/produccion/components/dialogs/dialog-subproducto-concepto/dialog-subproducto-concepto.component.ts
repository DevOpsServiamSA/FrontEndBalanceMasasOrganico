import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleIngresoHilo, ProductoProcesoxArticulo, SubProductoConcepto } from '../../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogConsumoSubproductoComponent } from '../dialog-consumo-subproducto/dialog-consumo-subproducto.component';
import { DialogSubproductoTodosComponent } from './dialog-subproducto-todos/dialog-subproducto-todos.component';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-subproducto-concepto',
  templateUrl: './dialog-subproducto-concepto.component.html',
  styleUrl: './dialog-subproducto-concepto.component.css'
})
export class DialogSubproductoConceptoComponent implements OnInit{
  public lote_madre!: string;
  loadingConceptosSupproducto: boolean = false;

  displayedColumns: string[] = ['articulo','descripcion','cantidad']
  dataSourceSubProductoConceptos = new MatTableDataSource<ProductoProcesoxArticulo>();
  

  constructor(private _consumoProvedorService: ConsumoProveedorServiceService,
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.cargarSubProductoConcepto(data.data);
      console.log(this.lote_madre);
  }
  ngOnInit(): void {
    this.loadDataTable();
  }

  openDialogDetalleSubProducto(rowData: any){
    const dialogRef = this.dialog.open(DialogConsumoSubproductoComponent, {
      data:{data: this.lote_madre,
        dato2: rowData.articulo
      },
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


  loadDataTable(){
    this.cargarConceptosSubproducto();
  }

  cargarConceptosSubproducto(){
    this.loadingConceptosSupproducto = true;
    this._consumoProvedorService.getSubProductoConcepto(this.lote_madre).subscribe(data =>{
      this.dataSourceSubProductoConceptos.data = data
      this.loadingConceptosSupproducto = false;
    }, (error: any) => {
      this.loadingConceptosSupproducto = false;
      console.error('Ocurrió un error al obtener datos de resumen de consumo:', error);
    });
  }

  cargarSubProductoConcepto(lote_madre: string) {
    this._consumoProvedorService.getSubProductoConcepto(lote_madre).subscribe(data =>{
      this.dataSourceSubProductoConceptos.data = data
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

  abrirVista(){
    const dialogRef = this.dialog.open(DialogSubproductoTodosComponent, {
      data:{data: this.lote_madre,
      naturaleza: 'TODOS'},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


  getTotalKG(): number {
    return this.dataSourceSubProductoConceptos.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }


  VerConsumoSubProductoTodos(){
    const dialogRef = this.dialog.open(DialogSubproductoTodosComponent, {
      data:{data: this.lote_madre},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


  async Exportar() {
    if (this.dataSourceSubProductoConceptos.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['articulo','descripcion','cantidad'];
    const data =  await this._utilidadServicio.formatoProductoProceso(this.dataSourceSubProductoConceptos);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_ingreso_hilo_(lote_madre:' + this.lote_madre + ')');
  }

}
