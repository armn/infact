import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { DataService } from "./data.service";
import { TranslateService } from "@ngx-translate/core";
import { FactsComponent } from "./facts/facts.component";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public data: DataService,
    private translate: TranslateService //private facts: FactsComponent
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
    this.translate.use("en");
  }

  switchLanguage(lang: string = "en") {
    this.translate.use(lang);
    this.data.addFacts(lang);
    this.data.addQuiz(lang);
    //this.facts.repeat();
  }
}
