import { Loader } from "pixi.js";
import { Spine } from "pixi-spine";
import { SkeletonData } from "@pixi-spine/runtime-4.0";

export function getSpine(): Spine {
    const spineExample = new Spine(Loader.shared.resources.pixie.spineData as SkeletonData);
    spineExample.scale.set(0.3, 0.3);
    spineExample.y = spineExample.height;
    spineExample.x = spineExample.width / 2;

    spineExample.stateData.setMix("running", "jump", 0.2);
    spineExample.stateData.setMix("jump", "running", 0.4);

    spineExample.state.setAnimation(0, "running", true);

    return spineExample;
}
