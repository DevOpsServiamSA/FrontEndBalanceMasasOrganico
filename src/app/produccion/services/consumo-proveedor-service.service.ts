import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoProveedorServiceService {

  constructor(private baseService: BaseService) { }

/* API PROVEEDOR CONSUMO, LOTE X PROVEEDOR, DETALLE POR LOTE PROVEEDOR */
  getConsumoProveedorDetalle(/*lote_madre: string, lote_proveedor: string, proveedor: string*/): Observable<any> {
    //return this.baseService.get(`/ConsumoProveedorDetalle/${lote_madre}/${lote_proveedor}/${proveedor}`);
    return this.baseService.get(`/ConsumoProveedorDetalle/DetalleFibra`);
  }
  getAllInformationxLote(lote_madre: string): Observable<any> {
    return this.baseService.get(`/loteMadre/${lote_madre}`);
  }
  getLotexProveedor(lote_madre: string, proveedor: string): Observable<any> {
    return this.baseService.get(`/Proveedor_x_lote/${lote_madre}/${proveedor}`);
  }

  /* FIBRA REUTIZABLE RESUMEN */
  getDetalleFibraReutilizable(lote_madre: string, articulo: string): Observable<any> {
    return this.baseService.get(`/DetalleFibraReutilizable/${lote_madre}/${articulo}`);
  }

  getDetalleFibraReutilizablexArticulo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleFibraReutilizableXArticulo/${lote_madre}`);
  }

  /* API HILO CONSUMO, HILO X ARTICULO, DETALLE POR ARTICULO HL */
  getDetalleHiloxArticulo(lote_madre: string, articulo: string, lote_hijo: string): Observable<any> {
    return this.baseService.get(`/DetalleConsumoHiloxArticulo/${lote_madre}/${articulo}/${lote_hijo}`);
  }

  getDetalleConsumoHiloTodos(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleConsumoHiloTodos/${lote_madre}`);
  }

  
  getLotes(): Observable<any> {
    return this.baseService.get(`/loteMadre/All`);
  }

  getLoteMadreInventarioInicioHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/InvInicioHilo/${lote_madre}`);
  }

  getLoteMadreIngresoHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/IngresosHilo/${lote_madre}`);
  }

  getLoteMadreSalidaHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/SalidasHilo/${lote_madre}`);
  }

  getLoteMadreInventarioFiNHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/InvFinHilo/${lote_madre}`);
  }

  getLoteMadreResumenConsumo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/ResumenConsumo/${lote_madre}`);
  }

  getLoteMadreResumenMerma(lote_madre: string): Observable<any> {
    return this.baseService.get(`/LoteMadre/ResumenMerma/${lote_madre}`);
  }

  //DETALLE INGRESO HILO
  getDetalleIngresoHilo(/*lote_madre: string,lote_hijo: string, consecutivo:string*/): Observable<any> {
    return this.baseService.get(`/DetalleMovimientos/IngresosHilo`);
  }

  //DETALLE CONSECUTIVO INGRESOS HILO
  getDetalleConsecutivoIngresoHilo(lote_madre: string,lote_hijo: string, consecutivo:string): Observable<any> {
    return this.baseService.get(`/DetalleMovimientos/ConsecutivoIngresos/${lote_madre}/${lote_hijo}/${consecutivo}`);
  }

  getDetalleSalidaHilo(lote_madre: string,lote_hijo: string, consecutivo: string): Observable<any> {
    return this.baseService.get(`/DetalleMovimientos/SalidasHilo/${lote_madre}/${lote_hijo}/${consecutivo}`);
  }


  //SUB-PRODUCTOS  
  getInvInicioSubProducto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/Subproducto/InventarioInicio/${lote_madre}`);
  }

  getIngresoSubProducto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/Subproducto/Ingresos/${lote_madre}`);
  }

  getSalidaSubProducto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/Subproducto/Salidas/${lote_madre}`);
  }

  getInvFinSubProducto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/Subproducto/InventarioFin/${lote_madre}`);
  }

  getResumenConsecutivo(lote_madre: string,lote_hijo: string): Observable<any> {
    return this.baseService.get(`/ResumenConsecutivo/Ingresos/${lote_madre}/${lote_hijo}`);
  }

  getResumenConsecutivoSalidaHilo(lote_madre: string,lote_hijo: string): Observable<any> {
    return this.baseService.get(`/ResumenConsecutivo/Salida/${lote_madre}/${lote_hijo}`);
  }



  getDetalleConsumoHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleConsumoHilo/${lote_madre}`);
  }

  getDetalleConsumoSubProducto(lote_madre: string, articulo: string): Observable<any> {
    return this.baseService.get(`/DetalleConsumoSubproducto/${lote_madre}/${articulo}`);
  }

  getDetalleGeneralMovimientoHilo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleGeneralMovimientoHilo/${lote_madre}`);
  }

  /*** SUB-PRODUCTO EN PROCESO ***/
  getSubProductoConcepto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/SubProductoConcepto/${lote_madre}`);
  }

  getSubProductoConsumoTodos(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleSubProductTodos/${lote_madre}`);
  }

  /*** PRODUCTO EN PROCESO ***/
  getProductoProcesoxArticulo(lote_madre: string): Observable<any> {
    return this.baseService.get(`/ProductoProcesoxArticulo/${lote_madre}`);
  }

  getProductoProcesoDetallexArticulo(lote_madre: string, articulo: string): Observable<any> {
    return this.baseService.get(`/ProductoProcesoDetallexArticulo/${lote_madre}/${articulo}`);
  }

  getDetalleProductoProcesoTodos(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleProductoProcesoTodos/${lote_madre}`);
  }

  getConsumoProveedorCompleto(lote_madre: string): Observable<any> {
    return this.baseService.get(`/ConsumoProveedorCompleto/${lote_madre}`);
  }

  getDetalleHiloxLoteHijo(lote_madre: string, articulo: string): Observable<any> {
    return this.baseService.get(`/DetalleHiloxLoteHijo/${lote_madre}/${articulo}`);
  }

  /* PERIODO PRODUCCION FECHAS */
  getPeriodoProduccion(lote_madre: string): Observable<any> {
    return this.baseService.get(`/PeriodoProduccionLoteMadre/${lote_madre}`);
  }

  /* FIBRA REUTILIZABLE */
  getResumenFibraReutilizable(lote_madre: string): Observable<any> {
    return this.baseService.get(`/DetalleFibraProduccion/${lote_madre}`);
  }

  guardarExcel(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file`, files[0], files[0].name);
    });
    
    return this.baseService.postFiles(`/DetalleIngresosHilos/CargarExcelHilos`, formData);
  }

  guardarExcelFibraDetalle(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file`, files[0], files[0].name);
    });
    
    return this.baseService.postFiles(`/ConsumoProveedor/CargarExcelDetalleFibra`, formData);
  }

}

