import { Injectable } from "@angular/core";
import { Fact, Quiz } from "./fact";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public facts: Array<Fact>;
  public quiz: Array<any>;

  constructor() {
    this.facts = [];
    this.quiz = [];
    this.addFacts();
    this.addQuiz();
  }

  addFacts(lang: string = "en") {
    if (lang == "lv") {
      this.facts = [];
      this.facts.push(
        new Fact(
          `Fakts latviešu valodā`,
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
          "protect"
        )
      );
    } else {
      this.facts = [];
      this.facts.push(
        new Fact(
          "Maintain at least 1 meter (3 feet) distance between yourself and anyone who is coughing or sneezing.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        ),
        new Fact(
          "Contaminated hands can transfer the virus through your eyes, nose, or mouth.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        ),
        new Fact(
          "If you have a fever, cough, and difficulty breathing, seek medical care early.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        ),
        new Fact(
          "Self-isolate by staying at home if you begin to feel unwell, even with mild symptoms such as a headache or low grade fever (37.3 C or above).",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "New COVID-19 cases globally from March 3 - March 17 have multiplied by 12+ times.",
          "https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd"
        ),
        new Fact(
          "Confirmed COVID-19 infections globally: 207860 at midnight on March 19",
          "https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd"
        ),
        new Fact(
          "Confirmed COVID-19 deaths globally: 8657 at midnight on March 19",
          "https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd"
        ),
        new Fact(
          "The most common symptoms of COVID-19 are fever, tiredness, and dry cough.",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "To date, there is no vaccine and no specific antiviral medicine to prevent or treat COVID-19.",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "Diseases can make anyone sick regardless of their race or ethnicity.",
          "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/share-facts.html"
        ),
        new Fact(
          "Someone who has completed quarantine or has been released from isolation does not pose a risk of infection to other people.",
          "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/share-facts.html"
        ),
        new Fact(
          "Cold weather and snow can't kill the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "Only wear a mask if you are ill with COVID-19 symptoms (especially coughing) or looking after someone who may have COVID-19.",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "While there has been one instance of a dog being infected in Hong Kong, to date, there is no evidence that a dog, cat or any pet can transmit COVID-19.",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "COVID-19 virus can be transmitted in all areas, including areas with hot and humid weather.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),

        new Fact(
          "Hand dryers are not effective in killing the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "The COVID-19 can't be transmitted through mosquito bites.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),

        new Fact(
          "Smoking, wearing multiple masks, and taking antibiotics are not effective against COVID-19 and can be harmful.",
          "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        ),
        new Fact(
          "Taking a hot bath does not prevent the new COVID-19 disease",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "UV lamps should not be used to sterilize hands or other areas of skin as UV radiation can cause skin irritation.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "Spraying alcohol or chlorine all over your body will not kill viruses that have already entered your body.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "Vaccines against pneumonia, such as pneumococcal vaccine and Haemophilus influenza type B (Hib) vaccine, do not provide protection against the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "There is no evidence that regularly rinsing the nose with saline has protected people from infection with the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "There is no evidence from the current outbreak that eating garlic has protected people from the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "People of all ages can be infected by the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "To date, there is no specific medicine recommended to prevent or treat the COVID-19.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
        ),
        new Fact(
          "If you are healthy, you only need to wear a mask if you are taking care of a person with suspected COVID-19 infection.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Wear a mask if you are coughing or sneezing.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Masks are effective only when used in combination with frequent hand-cleaning with alcohol-based hand rub or soap and water.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "If you wear a mask, then you must know how to use it and dispose of it properly.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Before putting on a mask, clean hands with alcohol-based hand rub or soap and water.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Cover mouth and nose with mask and make sure there are no gaps between your face and the mask.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Avoid touching the mask while using it; if you do, clean your hands with alcohol-based hand rub or soap and water.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Replace the mask with a new one as soon as it is damp and do not re-use single-use masks.",
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
        ),
        new Fact(
          "Oil falls 24% in 3rd worst day on record, sinks to more than 18-year low",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Roughly 5 million people in China lost their jobs in the first 2 months of 2020",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Retail sales of consumer goods dropped 20.5% year on year in January and February.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Online sales of physical consumer goods increased 3% during January & February.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Industrial production fell 13.5% during January & February.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Fixed-asset investment fell 24.5% during January & February.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "General Motors, Ford and Fiat Chrysler to temporarily close all US factories due to the COVID-19.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "Dow tumble reaches 2,100 points as fears about economic damage from COVID-19 grow.",
          "https://www.cnbc.com/2020/03/16/china-economy-millions-lose-their-jobs-as-unemployment-spikes.html"
        ),
        new Fact(
          "COVID-19 are viruses that circulate among animals with some of them also known to infect humans.",
          "https://www.ecdc.europa.eu/en/novel-coronavirus-china/questions-answers"
        ),
        new Fact(
          "From seasonal flu die approximately 1 in every 1000 people while the current mortality estimate for COVID-19 is 20-30 per every 1000 people.",
          "https://www.ecdc.europa.eu/en/novel-coronavirus-china/questions-answers"
        )
      );
    }
  }

  addQuiz(lang: string = "en") {
    if (lang == "lv") {
      this.quiz = [];
      this.quiz.push(
        new Quiz(
          `Jautājums latviešu valodā`,
          false,
          "The more social distance generally the better. As of 18.03.2020 WHO advises to Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing. "
        ),
        new Quiz(
          "I can only get contaminated if I touch my mouth with my hands.",
          false,
          "The virus can enter through your eyes, mouth and nose."
        ),
        new Quiz(
          "If I have a fever, cough, and difficulty breathing, I should seek medical care early.",
          true,
          "Yes, however you should not go to hospital but contact emergency services, as to avoid to potentialy contaminate more people."
        )
      );
    } else {
      this.quiz = [];
      this.quiz.push(
        // new Quiz(
        //   `You should maintain at least 0,5 m distance`,
        //   false,
        //   "The more social distance generally the better. As of 18.03.2020 WHO advises to maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing. "
        // ),
        new Quiz(
          "I can only get contaminated if I touch my mouth with my hands.",
          false,
          "The virus can enter through your eyes, mouth and nose."
        ),
        new Quiz(
          "If I have a fever, cough, and difficulty breathing, I should seek medical care early.",
          true,
          "Yes, however you should not go to hospital but contact emergency services, as to avoid to potentialy contaminate more people."
        ),
        new Quiz(
          "I should self isolate If I feel unwell, even with mild symptoms such as a headache or low grade fever (37.3 C or above).",
          true,
          "Yes, even if you do not have the COVID-19, staying at home avoids others to have their immune system defenses lowered by getting your sickness if it is contageous."
        ),
        new Quiz(
          "The most common symptoms of COVID-19 are fever, tiredness, and dry cough.",
          true,
          "Yes, some people also might have COVID-19 with no symptoms."
        ),
        new Quiz(
          "Cold weather and snow can kill the new coronavirus.",
          false,
          "Cold weather and snow cannot kill the new coronavirus."
        ),
        new Quiz(
          "I should wear a mask if I go outside to protect myself.",
          false,
          "Only wear a mask if you are ill with COVID-19 symptoms (especially coughing) or looking after someone who may have COVID-19."
        )
      );
    }
  }
}
