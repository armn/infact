import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2
} from "@angular/core";
import { Fact } from "../fact";
import { DataService } from "../data.service";
import { Plugins } from "@capacitor/core";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

const { Share } = Plugins;

@Component({
  selector: "app-facts",
  templateUrl: "./facts.component.html",
  styleUrls: ["./facts.component.scss"]
})
export class FactsComponent implements OnInit {
  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;
  view: boolean = false;

  @Input("facts") facts: Array<Fact>;
  @Output() choiceMade = new EventEmitter();
  @ViewChildren("factCard") factCards: QueryList<ElementRef>;

  factCardsArray: Array<ElementRef>;

  constructor(
    private renderer: Renderer2,
    public data: DataService,
    private alertController: AlertController,
    private translate: TranslateService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth / 2;
    this.factCardsArray = this.factCards.toArray();
    this.factCards.changes.subscribe(() => {
      this.factCardsArray = this.factCards.toArray();
    });
  }

  toggleView() {
    this.view = !this.view;
    this.repeat();
  }
  handlePan(event, view) {
    if (view) return;
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.facts.length
    )
      return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.factCardsArray[0].nativeElement, "moving");

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.factCardsArray[0].nativeElement,
      "transform",
      "translate(" +
        event.deltaX +
        "px, " +
        event.deltaY +
        "px) rotate(" +
        rotate +
        "deg)"
    );

    this.shiftRequired = true;
  }

  handlePanEnd(event, view) {
    if (view) return;

    this.toggleChoiceIndicator(false, false);

    if (!this.facts.length) return;

    this.renderer.removeClass(this.factCardsArray[0].nativeElement, "moving");

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(
        this.factCardsArray[0].nativeElement,
        "transform",
        ""
      );
      this.shiftRequired = false;
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.factCardsArray[0].nativeElement,
        "transform",
        "translate(" +
          toX +
          "px, " +
          (toY + event.deltaY) +
          "px) rotate(" +
          rotate +
          "deg)"
      );

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.facts[0]);
    }
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.facts.shift();
    }
  }

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card
    });
  }

  public repeat() {
    //this.facts = this.data.facts.slice();
    this.data.addFacts(this.translate.currentLang);
  }

  userClickedNext(event) {
    event.preventDefault();
    if (!this.facts.length) return false;
    this.renderer.setStyle(
      this.factCardsArray[0].nativeElement,
      "transform",
      "translate(0, -500px) rotate(-30deg)"
    );
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.facts.length) return false;
    if (heart) {
      this.renderer.setStyle(
        this.factCardsArray[0].nativeElement,
        "transform",
        "translate(" + this.moveOutWidth + "px, -100px) rotate(-30deg)"
      );
      this.toggleChoiceIndicator(false, true);
      this.emitChoice(heart, this.facts[0]);
    } else {
      this.renderer.setStyle(
        this.factCardsArray[0].nativeElement,
        "transform",
        "translate(-" + this.moveOutWidth + "px, -100px) rotate(30deg)"
      );
      this.toggleChoiceIndicator(true, false);
      this.emitChoice(heart, this.facts[0]);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  applyFilter(filter: string) {
    if (filter) {
      this.facts = this.data.facts
        .slice()
        .filter(fact => fact.category == filter);
    } else {
      this.facts = this.data.facts.slice();
    }
  }

  shareTwitter(fact) {
    this.socialSharing
      .shareViaTwitter(
        fact.title,
        "https://infact.lv/assets/infact.png",
        "https://infact.lv"
      )
      .then(() => {})
      .catch(() => {});
  }
  shareFact(fact) {
    // // Share via email
    // this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });

    Share.share({
      title: "InFact.lv",
      text: fact.title,
      url: "https://infact.lv",
      dialogTitle: this.translate.instant("SHARE")
    })
      .then(() => {})
      .catch(async error => {
        // Probably on desktop
        // if (error && error != "AbortError: Share canceled") {
        //   const shareAlert = await this.alertController.create({
        //     header: "Share",
        //     inputs: [
        //       {
        //         name: "url",
        //         value: window.location.href
        //       }
        //     ],
        //     buttons: [
        //       {
        //         text: "OK",
        //         role: "cancel",
        //         handler: data => {}
        //       }
        //     ]
        //   });
        //   await shareAlert.present();
        // }
      });
  }
}
