import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionComponent } from './produccion.component';
import { BalanceMasasComponent } from './components/balance-masas/balance-masas.component';
import { SharedModule } from '../shared/shared.module';
import { DialogsComponent } from './components/dialogs/dialog-Subproductos/dialogs.component';
import { DialogConsumoProveedorComponent } from './components/dialogs/dialog-consumo-proveedor/dialog-consumo-proveedor.component';
import { DialogDetalleIngresoHiloComponent } from './components/dialogs/dialog-detalle-ingreso-hilo/dialog-detalle-ingreso-hilo.component';
import { DialogDetalleSalidaHiloComponent } from './components/dialogs/dialog-detalle-salida-hilo/dialog-detalle-salida-hilo.component';
import { DialogResumenConsecutivoComponent } from './components/dialogs/dialog-resumen-consecutivo/dialog-resumen-consecutivo.component';
import { DialogResumenConsecutivoSalidaComponent } from './components/dialogs/dialog-resumen-consecutivo-salida/dialog-resumen-consecutivo-salida.component';
import { DialogConsumoProveedorDetalleComponent } from './components/dialogs/dialog-consumo-proveedor-detalle/dialog-consumo-proveedor-detalle.component';
import { DialogConsumoHiloDetalleComponent } from './components/dialogs/dialog-consumo-hilo-detalle/dialog-consumo-hilo-detalle.component';
import { DialogConsumoSubproductoComponent } from './components/dialogs/dialog-consumo-subproducto/dialog-consumo-subproducto.component';
import { DialogSubproductoConceptoComponent } from './components/dialogs/dialog-subproducto-concepto/dialog-subproducto-concepto.component';
import { DialogSubproductoTodosComponent } from './components/dialogs/dialog-subproducto-concepto/dialog-subproducto-todos/dialog-subproducto-todos.component';
import { DialogResumenConsecutivoTodosComponent } from './components/dialogs/dialog-resumen-consecutivo/dialog-resumen-consecutivo-todos/dialog-resumen-consecutivo-todos.component';
import { DialogResumenConsecutivoSalidaTodosComponent } from './components/dialogs/dialog-resumen-consecutivo-salida/dialog-resumen-consecutivo-salida-todos/dialog-resumen-consecutivo-salida-todos.component';
import { DialogLoteXProveedorComponent } from './components/dialogs/dialog-lote-x-proveedor/dialog-lote-x-proveedor.component';
import { DialogDetalleHiloXArticuloComponent } from './components/dialogs/dialog-detalle-hilo-x-articulo/dialog-detalle-hilo-x-articulo.component';
import { DialogProductoProcesoArticuloComponent } from './components/dialogs/dialog-producto-proceso-articulo/dialog-producto-proceso-articulo.component';
import { ProductoProcesoDetalleXArticuloComponent } from './components/dialogs/dialog-producto-proceso-articulo/producto-proceso-detalle-x-articulo/producto-proceso-detalle-x-articulo.component';
import { ConsumoProveedorCompletoComponent } from './components/dialogs/dialog-consumo-proveedor/consumo-proveedor-completo/consumo-proveedor-completo.component';
import { DialogDetalleHiloXLoteHijoComponent } from './components/dialogs/dialog-consumo-hilo-detalle/dialog-detalle-hilo-x-lote-hijo/dialog-detalle-hilo-x-lote-hijo.component';
import { DialogConsumoHiloTodosComponent } from './components/dialogs/dialog-consumo-hilo-detalle/dialog-consumo-hilo-todos/dialog-consumo-hilo-todos.component';
import { DialogProductoProcesoTodosComponent } from './components/dialogs/dialog-producto-proceso-articulo/dialog-producto-proceso-todos/dialog-producto-proceso-todos.component';
import { DialogDetalleFibraReutilizableComponent } from './components/dialogs/dialog-detalle-fibra-reutilizable/dialog-detalle-fibra-reutilizable.component';
import { DialogDetalleFibraReutilizableXArticuloComponent } from './components/dialogs/dialog-detalle-fibra-reutilizable/dialog-detalle-fibra-reutilizable-x-articulo/dialog-detalle-fibra-reutilizable-x-articulo.component';
import { DialogDetalleFibraReutilizableTodosComponent } from './components/dialogs/dialog-detalle-fibra-reutilizable/dialog-detalle-fibra-reutilizable-todos/dialog-detalle-fibra-reutilizable-todos.component';

@NgModule({
  declarations: [
    ProduccionComponent,
    BalanceMasasComponent,
    DialogsComponent,
    DialogConsumoProveedorComponent,
    DialogDetalleIngresoHiloComponent,
    DialogDetalleSalidaHiloComponent,
    DialogResumenConsecutivoComponent,
    DialogResumenConsecutivoSalidaComponent,
    DialogConsumoProveedorDetalleComponent,
    DialogConsumoHiloDetalleComponent,
    DialogConsumoSubproductoComponent,
    DialogSubproductoConceptoComponent,
    DialogSubproductoTodosComponent,
    DialogResumenConsecutivoTodosComponent,
    DialogResumenConsecutivoSalidaTodosComponent,
    DialogLoteXProveedorComponent,
    DialogDetalleHiloXArticuloComponent,
    DialogProductoProcesoArticuloComponent,
    ProductoProcesoDetalleXArticuloComponent,
    ConsumoProveedorCompletoComponent,
    DialogDetalleHiloXLoteHijoComponent,
    DialogConsumoHiloTodosComponent,
    DialogProductoProcesoTodosComponent,
    DialogDetalleFibraReutilizableComponent,
    DialogDetalleFibraReutilizableXArticuloComponent,
    DialogDetalleFibraReutilizableTodosComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    SharedModule
  ]
})
export class ProduccionModule { }
