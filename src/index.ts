import * as PIXI from "pixi.js";
import { PixiConsole, PixiConsoleConfig } from "pixi-console";

import rabbitImage from "./assets/rabbit.png";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;

    private app: PIXI.Application | undefined;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", rabbitImage);
        loader.add("spriteExample", "./spritesData.json"); // example of loading spriteSheet

        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        //
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();
        this.attachPixiConsole();

        const stage = this.app!.stage;

        const bunny = this.getBunny();
        bunny.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2);

        const birdFromSprite = this.getBird();
        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2 + bunny.height);

        stage.addChild(bunny);
        stage.addChild(birdFromSprite);

        this.app!.ticker.add(() => {
            bunny.rotation += 0.05;
        });
    }

    private getBunny(): PIXI.Sprite {
        const bunnyRotationPoint = {
            x: 0.5,
            y: 0.5,
        };

        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
        bunny.scale.set(2, 2);

        return bunny;
    }

    private getBird(): PIXI.AnimatedSprite {
        const bird = new PIXI.AnimatedSprite([
            PIXI.Texture.from("birdUp.png"),
            PIXI.Texture.from("birdMiddle.png"),
            PIXI.Texture.from("birdDown.png"),
        ]);
        bird.loop = true;
        bird.animationSpeed = 0.1;
        bird.play();
        bird.scale.set(3);

        return bird;
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0xd3d3d3,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private attachPixiConsole(): void {
        const consoleConfig = new PixiConsoleConfig();
        consoleConfig.consoleWidth = this.app!.view.width;
        consoleConfig.consoleHeight = this.app!.view.height;
        consoleConfig.backgroundAlpha = 0;

        const pixiConsole = new PixiConsole(consoleConfig);
        pixiConsole.show();

        this.app!.stage.addChild(pixiConsole);

        console.log("Pixi-console added 🦾");
        console.warn("Warnings example ✌");
        setTimeout(() => {
            throw new Error("Uncaught error example 👮‍♀️");
        }, 0);
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }
}

new Main();
