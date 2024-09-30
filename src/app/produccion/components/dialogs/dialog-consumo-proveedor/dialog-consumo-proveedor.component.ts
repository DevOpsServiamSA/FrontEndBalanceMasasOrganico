import { Component, Inject, OnInit } from '@angular/core';
import { BalanceMasas } from '../../../interfaces/balance-masas';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { DialogLoteXProveedorComponent } from '../dialog-lote-x-proveedor/dialog-lote-x-proveedor.component';
import { ConsumoProveedorCompletoComponent } from './consumo-proveedor-completo/consumo-proveedor-completo.component';


@Component({
  selector: 'app-dialog-consumo-proveedor',
  templateUrl: './dialog-consumo-proveedor.component.html',
  styleUrl: './dialog-consumo-proveedor.component.css'
})
export class DialogConsumoProveedorComponent implements OnInit {
  //value = 'Clear me';
  dataSourceConsumoProveedor = new MatTableDataSource<BalanceMasas>();
  displayedColumns: string[] = ['nro', 'nombre', 'kg', 'porcentaje'];
  public lote_madre!: string;

  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingConsumoProveedor: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private _consumoProvedorService: ConsumoProveedorServiceService
) {
   this.dataSourceConsumoProveedor = new MatTableDataSource(this.data.lote);
   this.lote_madre = data.data;
  }


  ngOnInit(): void {
    this.loadDatosProveedorConsumo();
  }


   loadDatosProveedorConsumo() {
    this.cargarDatosConsumoProveedor();
  }


  cargarDatosConsumoProveedor(){
    this.loadingConsumoProveedor = true;
    this._consumoProvedorService.getAllInformationxLote(this.lote_madre).subscribe(data =>{
      this.dataSourceConsumoProveedor.data = data
      this.loadingConsumoProveedor = false;
    }, (error: any) => {
      this.loadingConsumoProveedor = false;
      console.error('Ocurrió un error al obtener los proveedores:', error);
    });
  }


  loadDialogConsumoProveedorDetalle(rowData : any){
    const dialogRef = this.dialog.open(DialogLoteXProveedorComponent, {
      data:{data: this.lote_madre,
           dato3: rowData.nombre,
          data_nd: 'ND'},
      width:'1000px'
      //height:'1000px'
    });
    dialogRef.afterClosed().subscribe(resourceLimits => {
      
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

 

  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
  }

  getTotalKG(): number {
    return this.dataSourceConsumoProveedor.data
      .map((t: any) => t.kg)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  getTotalPorcentaje(): number {
    return this.dataSourceConsumoProveedor.data
      .map((t: any) => t.porcentaje)
      .reduce((acc: number, value: number) => acc + value, 0);
  }
 

  VerTodoConsumoProveedores(){
    const dialogRef = this.dialog.open(ConsumoProveedorCompletoComponent, {
      data:{data: this.lote_madre},
      width:'1800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }


}

