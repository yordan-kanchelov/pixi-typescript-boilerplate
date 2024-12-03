import "./style.css";
import { Application, AssetInitOptions, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8"
import { getSpine } from "./utils/spine-example";
import { createBird } from "./utils/create-bird";

const gameWidth = 1280;
const gameHeight = 720;

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    //     "color: #ff66a1;",
);

(async () => {
    const app = new Application();

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    })

    await app.init({
        backgroundColor: 0xd3d3d3,
        width: gameWidth,
        height: gameHeight,
    })

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [
                {
                    name: "bird",
                    assets: [
                        {
                            alias: "bird",
                            src: "./assets/simpleSpriteSheet.json",
                        },
                    ],
                },
                {
                    name: "spineboyData",
                    assets: [
                        {
                            alias: "spineboyData",
                            src: "./assets/spine-assets/spineboy-pro.skel",
                        },
                    ],
                },
                {
                    name: "spineboyAtlas",
                    assets: [
                        {
                            alias: "spineboyAtlas",
                            src: "./assets/spine-assets/spineboy-pma.atlas",
                        },
                    ],
                },
                {
                    name: "pixieData",
                    assets: [
                        {
                            alias: "pixieData",
                            src: "./assets/spine-assets/pixie.json",
                        },
                    ],
                },
                {
                    name: "pixieAtlas",
                    assets: [
                        {
                            alias: "pixieAtlas",
                            src: "./assets/spine-assets/pixie.atlas",
                        },
                    ],
                },
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["bird", "spineboyData", "spineboyAtlas", "pixieData", "pixieAtlas"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const birdFromSprite = createBird();
        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(gameWidth / 2, gameHeight / 4);

        const spineExample = await getSpine();

        app.stage.addChild(birdFromSprite);
        app.stage.addChild(spineExample);
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
})()
