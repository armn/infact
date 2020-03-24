import { Component } from "@angular/core";
import { DataService } from "../data.service";
import { Fact } from "../fact";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public facts: Array<Fact>;
  constructor(public data: DataService) {
    this.facts = this.data.facts.slice();
  }

  logChoice(event) {
    console.log(event);
  }
}
