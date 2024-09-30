import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BalanceMasas, DetalleFibraReutilizable, DetalleGeneralMovimientoHilo, InventarioHilo, PeriodoProduccion, ResumenConsumo, ResumenMerma } from '../../interfaces/balance-masas';
import { ConsumoProveedorServiceService } from '../../services/consumo-proveedor-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialog-Subproductos/dialogs.component';
import { DialogConsumoProveedorComponent } from '../dialogs/dialog-consumo-proveedor/dialog-consumo-proveedor.component';
import { Observable,  map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DialogResumenConsecutivoComponent } from '../dialogs/dialog-resumen-consecutivo/dialog-resumen-consecutivo.component';
import { DialogResumenConsecutivoSalidaComponent } from '../dialogs/dialog-resumen-consecutivo-salida/dialog-resumen-consecutivo-salida.component';
import { DialogConsumoHiloDetalleComponent } from '../dialogs/dialog-consumo-hilo-detalle/dialog-consumo-hilo-detalle.component';
import { DialogSubproductoConceptoComponent } from '../dialogs/dialog-subproducto-concepto/dialog-subproducto-concepto.component';
import { DialogProductoProcesoArticuloComponent } from '../dialogs/dialog-producto-proceso-articulo/dialog-producto-proceso-articulo.component';
import { DialogDetalleFibraReutilizableComponent } from '../dialogs/dialog-detalle-fibra-reutilizable/dialog-detalle-fibra-reutilizable.component';


@Component({
  selector: 'app-balance-masas',
  templateUrl: './balance-masas.component.html',
  styleUrl: './balance-masas.component.css'
})
export class BalanceMasasComponent implements OnInit {
  //displayedColumns: string[] = ['NRO','PROVEEDOR','kg','porcentaje']
  dataSourceConsumoProveedor = new MatTableDataSource<BalanceMasas>();
  dataSourceInventarioInicioHilo = new MatTableDataSource<InventarioHilo>();
  dataSourceIngresosHilo = new MatTableDataSource<InventarioHilo>();
  dataSourceSalidaHilo = new MatTableDataSource<InventarioHilo>();
  dataSourceInventarioFinHilo = new MatTableDataSource<InventarioHilo>();
  dataSourceResumenConsumo = new MatTableDataSource<ResumenConsumo>();
  dataSourceResumenMerma = new MatTableDataSource<ResumenMerma>();
  dataSourceDetalleFibraReutilizable = new MatTableDataSource<DetalleFibraReutilizable>();
  dataSourceResumenFibraReutilizable = new MatTableDataSource<ResumenConsumo>();

  dataSourceDetalleGeneralMovimientoHilo = new MatTableDataSource<DetalleGeneralMovimientoHilo>();

  dataSourcePeriodoProduccion = new MatTableDataSource<PeriodoProduccion>();


  //DEFINICION E INICIALIZACIÓN DE VARIABLES
  hasValidKgData: boolean = true;
  fecha_inicio: string;
  fecha_fin: string=''; 
  ltMadre:string="";
  value:string="";
  selectedValue: string = '';
  foods:string='';
  displayedColumns: string[] = ['nro', 'nombre', 'kg', 'porcentaje'];
  displayedColumnsResumenConsumo: string[] = ['material', 'kg','indice'];
  displayedColumnsResumenMerma: string[] = ['maxstd','real'/*,'real_alm'*/];
  ColumnsInventarioIS: string[] = ['lote', 'kg'];  

  ColumnsDetalleGeneralMovimientoHilo: string[] = ['lote', 'ingresos','salidas','stock_actual'];  

  displayedColumnsFibraReutilizable: string[] = ['material','kg','indice']


  myControl = new FormControl();
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  filteredOptionsChange!: any[];
  selectedLoteActivo: string = '';
  lote_madre = this.getLoteValue();


  constructor(
    private _consumoProvedorService: ConsumoProveedorServiceService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    
  ){
    this.fecha_inicio=''
  }


  
  // CONTROLAR DATOS DE CARGA EN INTERFAZ
  loadingResumenConsumo: boolean = false;
  loadingResumenMerma: boolean = false;
  loadingInvIniHilo: boolean = false;
  loadingIngresosHilo: boolean = false;
  loadingSalidasHilo: boolean = false;
  loadingInvFinHilo: boolean = false;
  loadingDetalleGeneralHilo: boolean = false;
  loadingFibraReutilizable: boolean = false;

  openDialogResumenConsecutivos(tipo: string, row: any): void{
    const lote = this.getLoteValue();
    if(tipo === 'ingresos'){
      const dialogRef = this.dialog.open(DialogResumenConsecutivoComponent, {
        data:{data: lote,
          rowData: row
        },
        width:'1000px'
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });

    }else if(tipo === 'salidas'){
      const dialogRef = this.dialog.open(DialogResumenConsecutivoSalidaComponent, {
        data:{data: lote,
          rowData: row
        },
        width:'1200px'
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }    
  }

  openDialogResumenConsecutivoSalidaHilo(rowData: any){
    const lote = this.getLoteValue();
    const dialogRef = this.dialog.open(DialogResumenConsecutivoSalidaComponent, {
      data:{data: lote,
        rowData: rowData
      },
      width:'1200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog');
    });
  }

  openDialogSubProducto(){
    const lote = this.getLoteValue();
    const dialogRef = this.dialog.open(DialogsComponent, {
      data:{data: lote},
      width:'1200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  //NUEVO CUADRO DE RESUMEN DE FIBRA REUTILIZABLE
  openDialogFibraReutilizable(rowData: any, index: number): void{
    const lote = this.getLoteValue();
    if(index===0){
      //this.cargarConsumoAlgodonProveedor();
      const dialogRef = this.dialog.open(DialogDetalleFibraReutilizableComponent, {
        width:'1000px',
        data: { data : lote
         }         
      });    
      dialogRef.afterClosed().subscribe(result => {
        
      });

    }
  }
  
  openDialogConsumoProveedor(rowData: any, index: number): void {
    const lote = this.getLoteValue();
    if(index===0){
      //this.cargarConsumoAlgodonProveedor();
      const dialogRef = this.dialog.open(DialogConsumoProveedorComponent, {
        width:'1000px',
        data: { data : lote
         }         
      });    
      dialogRef.afterClosed().subscribe(result => {
        
      });

    }else if(index===1){
      this.cargarDetalleConsumoHilo();
      const dialogRef = this.dialog.open(DialogConsumoHiloDetalleComponent, {
        width:'1800px',
        data: { data : lote
         }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
      
    }else if(index===2){
      const dialogRef = this.dialog.open(DialogProductoProcesoArticuloComponent, {
        width:'1800px',
        data: { data : lote
         }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
      
    }else if (index ===3) {
      // Agregar lógica para abrir el tercer diálogo aquí
      const dialogRef = this.dialog.open(DialogSubproductoConceptoComponent, {
        width:'1200px',
        data: { data : lote
         }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
    
  }
  


  ngOnInit(): void{   
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.cargarSelectLoteMadre();
  }

  displayFn(option: any): string {
    return option ? option.lam_lote : '';
  }

  private _filter(value: string): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase(): '';
    return this.options.filter(option => option.lam_lote.toLowerCase().includes(filterValue));
  }

    loadDetalleLoteMadre() {
      //this.cargarInventarioInicioHilo();
      //this.cargarIngresoHilo();
      //this.cargarSalidaHilo();
      //this.cargarInventarioFinHilo();

      this.cargarResumenConsumo();
      this.cargarResumenMerma();      
      this.cargarDetalleMovimientoGeneralHilo();
      this.cargarFechaProduccion();
      this.cargarResumenFibraReutilizable();
      //this.cargarConsumoAlgodonProveedor();
/*
      
      //this.cargarSelectLoteMadre();
      //this.cargarDetalleFibraReutilizable();
      */
    }

  

  onOptionSelected(selectedOption: any) {
    this.selectedLoteActivo = selectedOption.activo;  // Aquí asignamos el valor de 'activo' al seleccionar un lote
  }

  private getLoteValue(): string {
    return this.myControl.value ? this.myControl.value.lam_lote : ''; 
  }

  cargarSelectLoteMadre() {
    this._consumoProvedorService.getLotes().subscribe(data =>{
      this.options = data
    });
  }
  
  cargarFechaProduccion(){
    const lote = this.getLoteValue();
    //console.log('lotemadre', lote);
    this._consumoProvedorService.getPeriodoProduccion(lote)
      .subscribe(data => {
        //this.dataSourcePeriodoProduccion.data = data
        if(data && data.length >0){
          this.fecha_inicio = data[0].fecha_inicio;
          this.fecha_fin = data[0].fecha_fin;
        }
      })
  }


  cargarDetalleFibraReutilizable() {
    const lote = this.getLoteValue();
    this._consumoProvedorService.getDetalleFibraReutilizablexArticulo(lote)
      .subscribe(data =>{
      this.dataSourceDetalleFibraReutilizable.data = data
    });
  }

  cargarConsumoAlgodonProveedor() {
    const lote = this.getLoteValue();
    this._consumoProvedorService.getAllInformationxLote(lote)
      .subscribe(data =>{
      this.dataSourceConsumoProveedor.data = data
    });
  }

  cargarDetalleConsumoHilo() {
    const lote = this.getLoteValue();
    this._consumoProvedorService.getDetalleConsumoHilo(lote)
      .subscribe(data =>{
      this.dataSourceConsumoProveedor.data = data
    });
  }

  cargarDetalleGeneralMovimientoHilo(){
    const lote = this.getLoteValue();
    this._consumoProvedorService.getDetalleGeneralMovimientoHilo(lote)
    .subscribe(data =>{
      this.dataSourceDetalleGeneralMovimientoHilo.data = data
    });
  }

  valorFibraReutilizable: number | null = null;

  cargarResumenConsumo(){
      const lote = this.getLoteValue();
    this.loadingResumenConsumo = true;
    this._consumoProvedorService.getLoteMadreResumenConsumo(lote).subscribe(data =>{
      this.dataSourceResumenConsumo.data = data

      // Obtener el valor de 'kg' de la segunda fila (índice 1)
    if (data && data.length > 1) {
      this.valorFibraReutilizable = data[1].kg; // Guardar el valor de 'kg' en la posición 1 (segunda fila)
    } else {
      this.valorFibraReutilizable = null; // Si no hay suficientes datos, dejar la variable como null
    }

      this.loadingResumenConsumo = false;
    }, (error: any) => {
      this.loadingResumenConsumo = false;
      console.error('Ocurrió un error al obtener datos de resumen de consumo:', error);
    });
  }

  cargarResumenMerma(){
    const lote = this.getLoteValue();
    this.loadingResumenMerma = true;
    this._consumoProvedorService.getLoteMadreResumenMerma(lote).subscribe(data =>{
      this.dataSourceResumenMerma.data = data
      this.loadingResumenMerma = false;
    }, (error: any) => {
      this.loadingResumenMerma = false;
      console.error('Ocurrió un error al obtener las guías de remisión:', error);
    });
  }

  cargarResumenFibraReutilizable(){
    const lote = this.getLoteValue();
    this.loadingFibraReutilizable = true;

    this._consumoProvedorService.getResumenFibraReutilizable(lote).subscribe(data =>{
      this.dataSourceResumenFibraReutilizable.data = data

      const filteredData = data.filter((item: { kg: string | number | null; }) => item.kg !== null && item.kg !== '' && item.kg !== 0);

      this.dataSourceResumenFibraReutilizable.data = filteredData; 
      this.hasValidKgData = filteredData.length > 0;

      this.loadingFibraReutilizable = false;
    }, (error: any) => {
      this.loadingFibraReutilizable = false;
      console.error('Ocurrió un error al obtener las guías de remisión:', error);
    });
  }


  cargarInventarioInicioHilo() {
    const lote = this.getLoteValue();
    this.loadingInvIniHilo = true;
    this._consumoProvedorService.getLoteMadreInventarioInicioHilo(lote).subscribe(data =>{
      this.dataSourceInventarioInicioHilo.data = data
      this.loadingInvIniHilo = false;
    }, (error: any) => {
      this.loadingInvIniHilo = false;
      console.error('Ocurrió un error al obtener las guías de remisión:', error);
    });
  }

  cargarIngresoHilo() {
    const lote = this.getLoteValue();
    this.loadingIngresosHilo = true;
    this._consumoProvedorService.getLoteMadreIngresoHilo(lote).subscribe(data =>{
      this.dataSourceIngresosHilo.data = data
      this.loadingIngresosHilo = false;
    }, (error: any) => {
      this.loadingIngresosHilo = false;
      console.error('Ocurrió un error al obtener datos ingresos hilo:', error);
    });
  }

  cargarSalidaHilo() {
    const lote = this.getLoteValue();
    this.loadingSalidasHilo = true;
    this._consumoProvedorService.getLoteMadreSalidaHilo(lote).subscribe(data =>{
      this.dataSourceSalidaHilo.data = data
      this.loadingSalidasHilo = false;
    }, (error: any) => {
      this.loadingSalidasHilo = false;
      console.error('Ocurrió un error al obtener datos salida hilo:', error);
    });
  }

  cargarInventarioFinHilo() {
    const lote = this.getLoteValue();
    this.loadingInvFinHilo = true;
    this._consumoProvedorService.getLoteMadreInventarioFiNHilo(lote).subscribe(data =>{
      this.dataSourceInventarioFinHilo.data = data
      this.loadingInvFinHilo = false;
    }, (error: any) => {
      this.loadingInvFinHilo = false;
      console.error('Ocurrió un error al obtener inventario fin de hilo:', error);
    });
  }

  cargarDetalleMovimientoGeneralHilo() {
    const lote = this.getLoteValue();
    this.loadingDetalleGeneralHilo = true;
    this._consumoProvedorService.getDetalleGeneralMovimientoHilo(lote).subscribe(data =>{
      this.dataSourceDetalleGeneralMovimientoHilo.data = data
      this.loadingDetalleGeneralHilo = false;
    }, (error: any) => {
      this.loadingDetalleGeneralHilo = false;
      console.error('Ocurrió un error al obtener inventario fin de hilo:', error);
    });
  }

 
  agregarComaMiles(numero: number): string {
    // Check if the input is null, undefined, or not a number
  if (numero === null || numero === undefined || isNaN(numero)) {
    return ''; // Return an empty string or handle the case as needed
  }

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




  /*filtroLoteMadre(event : any){
    const valor = (event.target as HTMLInputElement).value
    this.filteredOptionsChange = this.filteredOptions.filter(option => 
      option.lam_lote.toLowerCase().includes(valor.toLowerCase) || option.lam_lote.toLowerCase().includes(valor.toLowerCase))
  }*/


  RangoSTD(real: number, maxstd: string): boolean {
    if (!maxstd) return false;
    
    const [min, max] = maxstd.split('-').map(str => parseFloat(str));
    return real >= min && real <= max;
  }




}

export class DialogContentSubProductos{
  
}