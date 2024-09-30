import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduccionComponent } from './produccion.component';
import { BalanceMasasComponent } from './components/balance-masas/balance-masas.component';

const routes: Routes = [
  { path: '', component: ProduccionComponent, children: [
    {path: '', component: BalanceMasasComponent},
    {path: 'balance-masas', component: BalanceMasasComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
