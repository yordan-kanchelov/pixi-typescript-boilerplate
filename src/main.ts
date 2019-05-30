import * as PIXI from "pixi.js";

export class Main {
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
    }

    private createRenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0xffff00,
            height: window.innerHeight,
            width: window.innerWidth,
        });

        document.body.appendChild(this.game.view);
    }
}

(function() {
    const game: Main = new Main();
})();
