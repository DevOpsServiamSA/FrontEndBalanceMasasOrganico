import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceMasasComponent } from './produccion/components/balance-masas/balance-masas.component';

const routes: Routes = [
   { path: '', redirectTo: 'produccion/balance-masas', pathMatch: 'full' },
   { path: 'produccion/balance-masas', loadChildren: () => import('./produccion/produccion.module').then(m => m.ProduccionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
