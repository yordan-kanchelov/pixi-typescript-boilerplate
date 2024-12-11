import "@esotericsoftware/spine-pixi-v7";
import { Spine } from "@esotericsoftware/spine-pixi-v7";

export async function getSpine(): Promise<Spine> {
    const spineboy = Spine.from("spineboyData", "spineboyAtlas", {
        // scale: 0.5,
    });

    spineboy.x = spineboy.width / 2;
    spineboy.y = spineboy.height;
    spineboy.state.setAnimation(0, "run", true);

    return spineboy;
}
