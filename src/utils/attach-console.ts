import { PixiConsole, PixiConsoleConfig } from "pixi-console";
import { Container } from "pixi.js";

export function attachConsole(stage: Container, width: number, height: number): void {
    const consoleConfig = new PixiConsoleConfig();
    consoleConfig.consoleWidth = width;
    consoleConfig.consoleHeight = height / 2.5;
    consoleConfig.showCaller = true;
    consoleConfig.fontSize = 15;

    const pixiConsole = new PixiConsole(consoleConfig);
    pixiConsole.show();

    stage.addChild(pixiConsole);

    console.warn("PIXI CONSOLE ATTACHED!");
}
