import * as PIXI from "pixi.js";

import "./style.css";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;

    private app!: PIXI.Application;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    // add for the test example purpose
    public helloWorld(): string {
        return "hello world";
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");

        loader.onComplete.once(() => {
            this.onAssetsLoaded();
        });

        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app.stage;

        const birdFromSprite = this.getBird();
        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(Main.GAME_WIDTH / 2, Main.GAME_HEIGHT / 2);

        stage.addChild(birdFromSprite);
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

    private onResize(): void {
        if (!this.app) {
            return;
        }

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
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
}

new Main();
