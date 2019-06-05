import * as PIXI from "pixi.js";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;
    private game: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", "https://raw.githubusercontent.com/pixijs/bunny-mark/master/deploy/images/rabbitv3.png");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.game.stage;

        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(0.5, 0.5);
        bunny.x = Main.GAME_WIDTH / 2;
        bunny.y = Main.GAME_HEIGHT / 2;
        bunny.scale.set(2, 2);
        stage.addChild(bunny);

        this.game.ticker.add(() => {
            bunny.rotation += 0.05;
        });
    }   

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0xffff00,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT
        });

        document.body.appendChild(this.game.view);

        this.game.renderer.resize(window.innerWidth, window.innerHeight);
        this.game.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.game.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", () => {
            this.game.renderer.resize(window.innerWidth, window.innerHeight);
            this.game.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
            this.game.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
        });
    }
}

const game: Main = new Main();
