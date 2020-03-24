export class Fact {
  constructor(
    public title: string,
    // public source: string,
    public url: string,
    public category?: string,
    public id?: string
  ) {}
}
export class Quiz {
  constructor(
    public title: string,
    public correct: boolean,
    public explanation: string
  ) {}
}
