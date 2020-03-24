import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FactsPageRoutingModule } from "./facts-routing.module";

import { FactsPage } from "./facts.page";
import { FactsComponent } from "../../facts/facts.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FactsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FactsPage, FactsComponent]
})
export class FactsPageModule {}
