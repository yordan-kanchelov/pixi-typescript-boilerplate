import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Assets } from "pixi.js";

export async function getSpine(): Promise<Spine> {
    const spineboy = Spine.from({
        atlas: "spineboyAtlas",
        skeleton: "spineboyData",
        scale: 0.5,
    });
    spineboy.state.data.defaultMix = 0.2;
    // Center the spine object on screen.
    spineboy.x = window.innerWidth / 2;
    spineboy.y = window.innerHeight / 2 + spineboy.getBounds().height / 2;
    // Set animation "cape-follow-example" on track 0, looped.
    spineboy.state.setAnimation(0, "run", true);
    return spineboy;
}
