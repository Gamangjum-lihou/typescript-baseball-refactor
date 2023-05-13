import BaseballController from "./Controller/BaseballController";

class App {
  play() {
    const game = new BaseballController();
    game.start();
  }
}

const app = new App();
app.play();
export default App;
