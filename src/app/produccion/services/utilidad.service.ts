import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { saveAs } from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { ConsumoProductoProcesoTodos, ConsumoProveedorCompleto, DetalleConsumoProveedor, DetalleFibraReutilizable, DetalleFibraReutilizableXArticulo, DetalleHiloTodos, DetalleHiloxArticulo, DetalleHiloXLoteHijo, DetalleIngresoHilo, DetalleMovimientoIngresoHilo, LotexProveedor, ProductoProcesoxArticulo } from '../interfaces/balance-masas';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar : MatSnackBar) { }

  mostrarAlerta(mensaje:string, tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 3000
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

  async copyAndFormatData(dataSource:MatTableDataSource<DetalleIngresoHilo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

  async formatoDetalleMovimientoHilo(dataSource:MatTableDataSource<DetalleMovimientoIngresoHilo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

  async formatoDetalleHiloTodos(dataSource:MatTableDataSource<DetalleHiloTodos>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

  async formatoDetalleHiloxArticulo(dataSource:MatTableDataSource<DetalleHiloxArticulo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

  async copyAndFormatData1(dataSource:MatTableDataSource<DetalleConsumoProveedor>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }



  async formatoConsumoProveedorCompleto(dataSource:MatTableDataSource<ConsumoProveedorCompleto>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }


  async formatoDetallePorLoteProveedor(dataSource:MatTableDataSource<LotexProveedor>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }


  async formatoProductoProceso(dataSource:MatTableDataSource<ProductoProcesoxArticulo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }


  async formatoExportarLoteHijoHilo(dataSource:MatTableDataSource<DetalleHiloXLoteHijo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }


  async formatoDetalleConsumoProductoProcesoTodos(dataSource:MatTableDataSource<ConsumoProductoProcesoTodos>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }


  async formatoDetalleFibraReutilizable(dataSource:MatTableDataSource<DetalleFibraReutilizable>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

  async formatoDetalleFibraReutilizablexArticulo(dataSource:MatTableDataSource<DetalleFibraReutilizableXArticulo>): Promise<any> {
    // Clona los datos para evitar modificar el original
    const copiedData = dataSource.data.map((item:any) => {
      const copiedItem: any = {};
    
      // Copia todas las propiedades, convirtiendo las fechas a cadenas
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          copiedItem[key] = item[key];
        }
      }
      return copiedItem;
    });
    return copiedData;
  }

}

