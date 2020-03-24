import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "facts", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "facts",
    loadChildren: () =>
      import("./pages/facts/facts.module").then(m => m.FactsPageModule)
  },
  {
    path: "quiz",
    loadChildren: () =>
      import("./pages/quiz/quiz.module").then(m => m.QuizPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
