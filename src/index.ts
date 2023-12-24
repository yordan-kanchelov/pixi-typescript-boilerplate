import "pixi-spine";
import "./style.css";
import { Application, Texture, AnimatedSprite, Assets } from "pixi.js";
import { getSpine } from "./spine-example";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    const birdFromSprite = getBird();
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(gameWidth / 2, gameHeight / 2);

    const spineExample = await getSpine();
    console.log(spineExample);

    app.stage.addChild(birdFromSprite);
    app.stage.addChild(spineExample);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "bird",
                assets: [
                    {
                        name: "bird",
                        srcs: "./assets/simpleSpriteSheet.json",
                    },
                ],
            },
            {
                name: "pixie",
                assets: [
                    {
                        name: "pixie",
                        srcs: "./assets/spine-assets/pixie.json",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(["bird", "pixie"]);
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}

function getBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
