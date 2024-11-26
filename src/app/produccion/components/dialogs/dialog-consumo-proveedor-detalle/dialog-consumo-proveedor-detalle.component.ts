import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceMasas, DetalleConsumoProveedor } from '../../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../../services/consumo-proveedor-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilidadService } from '../../../services/utilidad.service';
import * as XLSX from 'xlsx';
import { FlexLayoutModule } from '@angular/flex-layout';
import { take } from 'rxjs';


@Component({
  selector: 'app-dialog-consumo-proveedor-detalle',
  templateUrl: './dialog-consumo-proveedor-detalle.component.html',
  styleUrl: './dialog-consumo-proveedor-detalle.component.css'
})
export class DialogConsumoProveedorDetalleComponent implements OnInit {
  dataSourceConsumoProveedorDetalle = new MatTableDataSource<DetalleConsumoProveedor>();
  columnsConsumoProveedorDetalle: string[] = ['fecha_embarque', 'lote_madre','embarque', 'orden_compra','guia_remision','articulo','cantidad','cantidad_recibida_oc','cantidad_consumida'];
  public nombre!:string;
  public lote_madre!: string;
  public lote_proveedor!: string;
  selectedFile: File | null = null;
  loading:boolean = false;
  isUploading: boolean = false;

  constructor(private _utilidadServicio: UtilidadService,
    private _consumoProvedorService: ConsumoProveedorServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any){ 
      this.dataSourceConsumoProveedorDetalle = new MatTableDataSource(this.data.lote_madre);
      this.lote_madre = data.data_lote_madre;
      this.lote_proveedor = data.data_lote_proveedor;
      this.nombre = data.data_razon_social;
      //this.cargarConsumoProveedorDetalle(data.data);
      //console.log(this.lote_madre);
  }
  ngOnInit(): void {
    this.loadDetalleLoteMadre();
   // this.dataSourceConsumoProveedorDetalle.data = this.processData(this.data.lote_madre);
  }


   // CONTROLAR DATOS DE CARGA EN INTERFAZ
   loadingConsumoProveedorDetalle: boolean = false;

 /* cargarConsumoProveedorDetalle(lote_madre: string) {
    this._consumoProvedorService.getConsumoProveedorDetalle(lote_madre).subscribe(data =>{
      this.dataSourceConsumoProveedorDetalle.data = data
    });
  }*/


    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; // Almacenar el archivo seleccionado
      }
    }


    uploadExcel(): void {    
      if (!this.selectedFile) {
        alert('Por favor selecciona un archivo');
        return;
      }
      // Deshabilitar el botón durante la carga
      this.isUploading = true;
      this.loading = true;
      // Enviar el archivo al servicio
      this._consumoProvedorService.guardarExcelFibraDetalle([this.selectedFile])
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          alert('Datos cargados y guardados exitosamente.');
          this.isUploading = false;
          this.loading = false;
          this.cargarDatosDetalleConsumoProveedor();
        },
        error: (err) => {
          console.error('Error al cargar el archivo', err);
          alert('Error al cargar el archivo.');
          this.isUploading = false; // Habilitar el botón nuevamente
        },
      });
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

  loadDetalleLoteMadre() {
    this.cargarDatosDetalleConsumoProveedor();
  }
  

  cargarDatosDetalleConsumoProveedor(){
    this.loadingConsumoProveedorDetalle = true;
    this._consumoProvedorService.getConsumoProveedorDetalle(/*this.data.data_lote_madre,this.data.data_lote_proveedor,this.data.data_razon_social*/).subscribe(data =>{
      this.dataSourceConsumoProveedorDetalle.data = data;
      //this.dataSourceConsumoProveedorDetalle.data = data;
      this.loadingConsumoProveedorDetalle = false;
    }, (error: any) => {
      this.loadingConsumoProveedorDetalle = false;
      console.error('Ocurrió un error al obtener las guías de remisión:', error);
    });
  }

  async exportTableToExcel() {
    if (this.dataSourceConsumoProveedorDetalle.data.length <= 0) {
      this._utilidadServicio.mostrarAlerta("No no hay informacion que exportar", "Ok");
      return;
    }
    
    const header = ['fecha_embarque', 'embarque', 'orden_compra','guia_remision','articulo','cantidad'];
    const data =  await this._utilidadServicio.copyAndFormatData1(this.dataSourceConsumoProveedorDetalle);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Genera el archivo Excel (en formato xlsx)
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this._utilidadServicio.saveAsExcelFile(excelBuffer, 'detalle_consumo_lote_proveedor' + this.lote_madre + ')');
  }


  redondearDecimal(valor: number, decimales: number): number {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
  }


  getTotalKG(): number {
    return this.dataSourceConsumoProveedorDetalle.data
      .map((t: any) => t.cantidad_consumida)
      .filter((value: number | null) => value !== null)
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  processData(data: any[]): any[] {
    const seen = new Set();
    return data.map(row => {
      if (seen.has(row.cantidad_consumida)) {
        return { ...row, cantidad_consumida: 0 };
      } else {
        seen.add(row.cantidad_consumida);
        return row;
      }
    });
  }
 

}
