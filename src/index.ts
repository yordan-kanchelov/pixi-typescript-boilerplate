import * as PIXI from "pixi.js";

import rabbitImage from "./assets/rabbit.png";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;

    private pixiApp: PIXI.Application | undefined;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", rabbitImage);
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.pixiApp!.stage;

        const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
        bunny.anchor.set(0.5, 0.5);
        bunny.x = Main.GAME_WIDTH / 2;
        bunny.y = Main.GAME_HEIGHT / 2;
        bunny.scale.set(2, 2);
        stage.addChild(bunny);

        this.pixiApp!.ticker.add(() => {
            bunny.rotation += 0.05;
        });

        (window as any).pixi = PIXI;
    }

    private createRenderer(): void {
        this.pixiApp = new PIXI.Application({
            backgroundColor: 0xffff00,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.pixiApp.view);

        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
        this.pixiApp.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.pixiApp.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize);
    }

    private onResize(): void {
        if (!this.pixiApp) {
            return;
        }

        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
        this.pixiApp.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.pixiApp.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }
}

new Main();
