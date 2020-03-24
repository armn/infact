import { Component, OnInit } from "@angular/core";
import { Fact } from "../../fact";
import { DataService } from "../..//data.service";

@Component({
  selector: "app-facts-page",
  templateUrl: "./facts.page.html",
  styleUrls: ["./facts.page.scss"]
})
export class FactsPage implements OnInit {
  public facts: Array<Fact>;
  constructor(public data: DataService) {
    //this.facts = this.data.facts.slice();
    //this.facts = this.data.facts;
  }

  ngOnInit() {}

  logChoice(event) {}
}
