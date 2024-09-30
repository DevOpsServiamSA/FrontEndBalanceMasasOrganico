import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LotexProveedor } from '../../../interfaces/balance-masas';
import { DialogConsumoProveedorDetalleComponent } from '../dialog-consumo-proveedor-detalle/dialog-consumo-proveedor-detalle.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dialog-lote-x-proveedor',
  templateUrl: './dialog-lote-x-proveedor.component.html',
  styleUrl: './dialog-lote-x-proveedor.component.css'
})
export class DialogLoteXProveedorComponent implements OnInit{

  public lote_madre!: string;
  public nombre!: string;
  public data_nd!: string;
  dataSourceLotexProveedor = new MatTableDataSource<LotexProveedor>();
  displayedColumns: string[] = ['lote', 'cantidad', 'porcentaje'];
  // CONTROLAR DATOS DE CARGA EN INTERFAZ
 loadingLotexProveedor: boolean = false;


  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private _utilidadServicio: UtilidadService
  ) {
   this.dataSourceLotexProveedor = new MatTableDataSource(this.data.lote_madre);
   this.lote_madre = data.data;
   //console.log('DATOS CONSTRUCTOR', this.lote_madre)
   this.nombre = data.dato3.nombre;
   this.data_nd = data.data_nd;

  }



  ngOnInit(): void {
    this.loadDatosLotexProveedor();
  }

  loadDialogConsumoProveedorDetalle(rowData : any){
    const dialogRef = this.dialog.open(DialogConsumoProveedorDetalleComponent, {
      data:{
            data_lote_madre: this.lote_madre,
            data_lote_proveedor: rowData.lote,
            data_razon_social: this.data.dato3
          },
      width:'3500px'
      //height:'1000px'
    });
    dialogRef.afterClosed().subscribe(resourceLimits => {
      
    });
  }

  loadDatosLotexProveedor() {
    this.cargarDatosLotexProveedor();
  }

  cargarDatosLotexProveedor(){
    this.loadingLotexProveedor = true;
    this._consumoProvedorService.getLotexProveedor(this.data.data,this.data.dato3).subscribe(data =>{
      this.dataSourceLotexProveedor.data = data
      this.loadingLotexProveedor = false;
    }, (error: any) => {
      this.loadingLotexProveedor = false;
      console.error('Ocurrió un error al obtener datos de proveedor:', error);
    });
  }

  agregarComaMiles(numero: number): string {
    let numeroFormateado = numero.toFixed(2).toString();
    const partes = numeroFormateado.split('.');
  
    if (partes[1] === '00') {
      numeroFormateado = partes[0];
    }  
    numeroFormateado = numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numeroFormateado;
  }


  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
  }

  getTotalKG(): number {
    return this.dataSourceLotexProveedor.data
      .map((t: any) => t.cantidad)
      .reduce((acc: number, value: number) => acc + value, 0);
  }
  

  getTotalPorcentaje(): number {
    return this.dataSourceLotexProveedor.data
      .map((t: any) => t.porcentaje)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  async exportTableToExcel() {
    if (this.dataSourceLotexProveedor.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['lote', 'cantidad', 'porcentaje'];
    const data =  await this._utilidadServicio.formatoDetallePorLoteProveedor(this.dataSourceLotexProveedor);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'DetallePorLoteProveedor' + this.lote_madre + ')');
  }

}
