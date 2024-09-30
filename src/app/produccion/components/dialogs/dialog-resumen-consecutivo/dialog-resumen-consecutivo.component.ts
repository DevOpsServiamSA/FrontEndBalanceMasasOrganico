import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceMasas } from '../../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogDetalleIngresoHiloComponent } from '../dialog-detalle-ingreso-hilo/dialog-detalle-ingreso-hilo.component';
import { DialogResumenConsecutivoTodosComponent } from './dialog-resumen-consecutivo-todos/dialog-resumen-consecutivo-todos.component';

@Component({
  selector: 'app-dialog-resumen-consecutivo',
  templateUrl: './dialog-resumen-consecutivo.component.html',
  styleUrl: './dialog-resumen-consecutivo.component.css'
})
export class DialogResumenConsecutivoComponent implements OnInit {
  public lote_madre!: string;
  public lote_hijo!:string;
  public consecutivo!:string;
  loadingResumenConsecutivoI: boolean = false;
  displayedColumns: string[] = ['lote_madre','consecutivo','desc_consecutivo','cantidad']
  dataSourceResumenConsecutivos = new MatTableDataSource<BalanceMasas>();

  constructor(private _consumoProvedorService: ConsumoProveedorServiceService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.lote_hijo = data.rowData.lote;
      this.consecutivo = data.rowData.consecutivo;
      this.cargarConsecutivo(data.data, data.rowData.lote);
      console.log('LOTE_MADRE INGRESOS',this.lote_madre);
  }
  ngOnInit(): void {
    this.cargarResumenConsumoI();
  }

  loadDialogDetalleIngresoHilo(rowData : any){
    const dialogRef = this.dialog.open(DialogDetalleIngresoHiloComponent, {
      data:{data: this.lote_madre,
           rowData: this.lote_hijo,
           dato3: rowData.consecutivo},
      width:'3500px'      
      //height:'1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }

  cargarConsecutivo(lote_madre: string, lote_hijo: string) {
    this._consumoProvedorService.getResumenConsecutivo(lote_madre,lote_hijo).subscribe(data =>{
      this.dataSourceResumenConsecutivos.data = data
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



  cargarResumenConsumoI(){
    this.loadingResumenConsecutivoI = true;
    this._consumoProvedorService.getResumenConsecutivo(this.lote_madre,this.lote_hijo).subscribe(data =>{
      this.dataSourceResumenConsecutivos.data = data
      this.loadingResumenConsecutivoI = false;
    }, (error: any) => {
      this.loadingResumenConsecutivoI = false;
      console.error('Ocurrió un error al obtener datos de resumen de consumo:', error);
    });
  }



  abrirVista(){
    const dialogRef = this.dialog.open(DialogResumenConsecutivoTodosComponent, {
      data:{data: this.lote_madre,
      data2: this.lote_hijo,
      dato3: 'TODOS'},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


  getTotalKG(): number {
    return this.dataSourceResumenConsecutivos.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  
}
