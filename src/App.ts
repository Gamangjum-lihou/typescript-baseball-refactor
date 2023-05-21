import BaseballController from './Controller';

class App {
  #controller;

  constructor() {
    this.#controller = new BaseballController();
  }
  play() {
    this.#controller.start();
  }
}

const app = new App();

app.play();

export default App;
