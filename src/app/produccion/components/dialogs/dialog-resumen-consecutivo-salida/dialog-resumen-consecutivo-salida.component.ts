import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceMasas } from '../../../interfaces/balance-masas';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { DialogDetalleSalidaHiloComponent } from '../dialog-detalle-salida-hilo/dialog-detalle-salida-hilo.component';
import { DialogResumenConsecutivoSalidaTodosComponent } from './dialog-resumen-consecutivo-salida-todos/dialog-resumen-consecutivo-salida-todos.component';

@Component({
  selector: 'app-dialog-resumen-consecutivo-salida',
  templateUrl: './dialog-resumen-consecutivo-salida.component.html',
  styleUrl: './dialog-resumen-consecutivo-salida.component.css'
})
export class DialogResumenConsecutivoSalidaComponent implements OnInit{
  public lote_madre!: string;
  public lote_hijo!:string;
  loadingResumenConsumoS: boolean = false;
  displayedColumns: string[] = ['lote_madre','lote_hijo','consecutivo','descripcion','cantidad']
  dataSourceResumenConsecutivoSalida = new MatTableDataSource<BalanceMasas>();

  constructor(private _consumoProvedorService: ConsumoProveedorServiceService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.lote_madre = data.data;
      this.lote_hijo = data.rowData.lote;
      this.cargarConsecutivoSalida(data.data, data.rowData.lote);
  }
  ngOnInit(): void {
    this.cargarResumenConsumoS();
  }

  loadDialogDetalleSalidaHilo(rowData : any){
    const dialogRef = this.dialog.open(DialogDetalleSalidaHiloComponent, {
      data:{data: this.lote_madre,
           rowData: this.lote_hijo,
           dato3: rowData.consecutivo
           },
      width:'3500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }

  cargarConsecutivoSalida(lote_madre: string, lote_hijo: string){
    this._consumoProvedorService.getResumenConsecutivoSalidaHilo(lote_madre,lote_hijo).subscribe(data =>{
      this.dataSourceResumenConsecutivoSalida.data = data
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

  cargarResumenConsumoS(){
    this.loadingResumenConsumoS = true;
    this._consumoProvedorService.getResumenConsecutivoSalidaHilo(this.lote_madre,this.lote_hijo).subscribe(data =>{
      this.dataSourceResumenConsecutivoSalida.data = data
      this.loadingResumenConsumoS = false;
    }, (error: any) => {
      this.loadingResumenConsumoS = false;
      console.error('Ocurrió un error al obtener datos de resumen de consumo:', error);
    });
  }


  abrirVista(){
    const dialogRef = this.dialog.open(DialogResumenConsecutivoSalidaTodosComponent, {
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
    return this.dataSourceResumenConsecutivoSalida.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

}
