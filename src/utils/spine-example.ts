import { Spine } from "pixi-spine";

import { Assets } from "pixi.js";

export async function getSpine(): Promise<Spine> {
    const spineResource = await Assets.get("pixie");

    const spineExample = new Spine(spineResource.spineData);
    spineExample.scale.set(0.3, 0.3);
    spineExample.y = spineExample.height * 1.1;
    spineExample.x = spineExample.width / 2;
    spineExample.stateData.setMix("running", "jump", 0.2);
    spineExample.stateData.setMix("jump", "running", 0.4);
    spineExample.state.setAnimation(0, "running", true);

    return spineExample;
}
