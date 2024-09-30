export interface BalanceMasas {

    nro: string,
    nombre: string,
    kg: string,
    porcetanje: string
}

export interface InventarioHilo {
    lote: string,
    kg: string;
}

export interface ResumenConsumo {
    material: string,
    kg: string,
    indice: string
}

export interface ResumenMerma{
    maxstd: string,
    real: string
    //real_alm: string
}

export interface DetalleIngresoHilo{
    articulo:string,
    //lote_hijo:string,
    desc_articulo:string,
    cantidad:string
}

export interface DetalleHiloXLoteHijo{
    lote_hijo:string,
    articulo:string,
    descripcion:string,
    cantidad:string
}
//fecha','lote_madre', 'lote_hijo','bodega','articulo','desc_articulo',
 // 'cantidad','consecutivo','desc_consecutivo','aplicacion','referencia
export interface DetalleMovimientoIngresoHilo{
    fecha:string
    lote_madre:string,
    lote_hijo:string,
    bodega:string,
    articulo:string,
    desc_articulo:string,
    cantidad:string,
    consecutivo:string,
    desc_consecutivo:string,
    aplicacion:string,
    referencia:string
}

export interface DetalleHiloxArticulo{
    lote_hijo:string,
    fecha:string,
    articulo:string,
    desc_articulo:string,
    cantidad:string
}


export interface ResumenConsecutivo{
    lote_madre:string,
    consecutivo:string
    desc_consecutivo:string
    cantidad:string
}

export interface ResumenConsecutivoSalida{
    lote_madre:string,
    lote_hijo:string,
    consecutivo:string,
    descripcion:string,
    cantidad:string
}

export interface DetalleConsumoProveedor{
    fecha_embarque:string,
    embarque:string,
    orden_compra:string,
    guia_remision:string,
    articulo:string,
    cantidad_recibida_oc:string,
    cantidad_consumida:string
}

export interface DetalleGeneralMovimientoHilo{
    lote:string,
    ingresos:string,
    salidas:string,
    stock_actual:string
}

export interface SubProductoConcepto{
    lote_madre:string,
    tipo:string,
    naturaleza:string,
    cantidad:string
}

export interface LotexProveedor{
    lote:string,
    cantidad:string,
    porcentaje:string
}

export interface ProductoProcesoxArticulo{
    articulo:string,
    descripcion:string,
    cantidad:string
}

export interface ProductoProcesoDetallexArticulo{
    lote_hijo:string,
    fecha:string,
    articulo:string,
    desc_articulo:string,
    cantidad:string
}

export interface SubProductoDetallexArticulo{
    fecha:string,
    lote_hijo:string,    
    articulo:string,
    desc_articulo:string,
    cantidad:string
}


// CONSUMO COMPLETO DE PROVEEDORES
 export interface ConsumoProveedorCompleto{
    fecha :string,
    bodega :string,
    articulo: string,
    desc_articulo: string,
    cantidad: string,
    consecutivo: string,
    desc_consecutivo: string,
    aplicacion: string,
    referencia: string,
    proveedor: string,
    descripcion_articulo: string,
    lote :string
 }

 export interface ConsumoProductoProcesoTodos{
    fecha:string
    lote_madre:string,
    lote_hijo:string,
    bodega:string,
    articulo:string,
    desc_articulo:string,
    tipo:string,
    naturaleza:string,
    descripcion_articulo:string,
    cantidad:string,
    consecutivo:string,
    desc_consecutivo:string,
    aplicacion:string,
    referencia:string
}

export interface DetalleHiloTodos{
    fecha:string
    lote_madre:string,
    lote_hijo:string,
    bodega:string,
    articulo:string,
    desc_articulo:string,
    cantidad:string,
    consecutivo:string,
    desc_consecutivo:string,
    descripcion_articulo:string,
    aplicacion:string,
    referencia:string
}

export interface DetalleFibraReutilizable{
    fecha:string,
    lote_madre:string,
    lote_hijo:string,
    bodega:string,
    articulo:string,
    descripcion:string,
    cantidad:string,
    consecutivo:string,
    desc_consecutivo:string,
    referencia:string
    observacion:string
}

export interface DetalleFibraReutilizableXArticulo{
    articulo:string,
    descripcion:string,
    cantidad:string
}

export interface PeriodoProduccion{
    fecha_inicio: string
}