import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2
} from "@angular/core";
import { DataService } from "src/app/data.service";
import { Fact, Quiz } from "src/app/fact";
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s cubic-bezier(.76,.3,.83,.67)", style({ opacity: 1 }))
      ])
      // transition(":leave", [
      //   style({ opacity: 1 }),
      //   animate("1s cubic-bezier(.76,.3,.83,.67)", style({ opacity: 0 }))
      // ])
    ])
  ]
})
export class QuizPage implements OnInit {
  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;
  answerVisible: boolean = false;
  public score: number = 0;

  @Input("facts") facts: Array<Quiz>;
  @Output() choiceMade = new EventEmitter();
  @ViewChildren("factCard") factCards: QueryList<ElementRef>;

  factCardsArray: Array<ElementRef>;

  constructor(
    private renderer: Renderer2,
    public data: DataService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.facts = this.data.quiz;
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth / 5;
    this.factCardsArray = this.factCards.toArray();
    this.factCards.changes.subscribe(() => {
      this.factCardsArray = this.factCards.toArray();
    });
  }

  handlePan(event) {
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

  handlePanEnd(event) {
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
    // this.choiceMade.emit({
    //   choice: heart,
    //   payload: card
    // });
  }

  public repeat() {
    //this.facts = this.data.facts.slice();
    this.data.addQuiz(this.translate.currentLang);
    this.facts = this.data.quiz;
  }

  userClickedNext(event) {
    this.answerVisible = false;
    this.shiftRequired = true;
    this.handleShift();
  }

  userClickedButton(event, heart) {
    this.answerVisible = true;
    event.preventDefault();
    if (!this.facts.length) return false;

    if (heart && this.facts[0].correct) {
      this.toggleChoiceIndicator(false, true);

      //this.emitChoice(heart, this.facts[0]);
    } else if (heart && !this.facts[0].correct) {
      this.toggleChoiceIndicator(true, false);
    }

    if (!heart && this.facts[0].correct) {
      this.toggleChoiceIndicator(true, false);
    }

    if (!heart && !this.facts[0].correct) {
      this.toggleChoiceIndicator(false, true);
    }

    // if (heart) {
    //   this.renderer.setStyle(
    //     this.factCardsArray[0].nativeElement,
    //     "transform",
    //     "translate(" + this.moveOutWidth + "px, -25px) rotate(-30deg)"
    //   );
    // } else {
    //   this.renderer.setStyle(
    //     this.factCardsArray[0].nativeElement,
    //     "transform",
    //     "translate(-" + this.moveOutWidth + "px, -25px) rotate(30deg)"
    //   );
    // }
  }
}
