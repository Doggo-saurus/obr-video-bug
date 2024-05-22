import './style.css'
import { setupCounter } from './counter.ts'
import OBR, { Item, buildImage } from "@owlbear-rodeo/sdk";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <p>Bug details:</p>
      <p>Case 1: Video added to local.item only seems to animate with interaction to the canvas:</p>
      <p><button id="case1" type="button">Try</button></p>
      <p>Case 2: Video added to local.item starts working if any other video is added to scene.items:</p>
      <p><button id="case2" type="button">Try</button></p>
      <p>Case 3: Enable the smoke extension and all animation stops working (which i thought was kinda odd)</p>
      <p>You need to both enable the extension and turn it on with the checkbox in the top bar, no other config required</p>
      <br>
      <p>In all cases, animation never starts from the beginning of the video. to replicate, try the buttons for case1 or case2 again without a page refresh.</p>
      <br>
      <p>Aside from the above bugs, the other main feature that's missing for me is the ability to only play videos once and disable looping.</p>
    </div>
  </div>
`

const localTestItems:Item[] = [];
const sceneTestItems:Item[] = [];

function clear() {
  OBR.scene.local.deleteItems(localTestItems.map((item) => item.id));
  OBR.scene.items.deleteItems(sceneTestItems.map((item) => item.id));
}

document.querySelector('#case1')?.addEventListener('click', () => {
  clear();
  const item = buildImage(
    {
      height: 200,
      width: 2000,
      url: "https://pub-0765502852f44e9dbc7e1096fd576161.r2.dev/JB2A_DnD5e/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Blue_4000x400.webm",
      mime: "video/webm",
    },
    { dpi: 300, offset: { x: 0, y: 0 } }
  )
    .plainText("Test case 1 (scene.local)")
    .build();

  OBR.scene.local.addItems([item]);
  localTestItems.push(item);
});

document.querySelector('#case2')?.addEventListener('click', () => {
  clear();
  const item = buildImage(
    {
      height: 200,
      width: 2000,
      url: "https://pub-0765502852f44e9dbc7e1096fd576161.r2.dev/JB2A_DnD5e/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Blue_4000x400.webm",
      mime: "video/webm",
    },
    { dpi: 300, offset: { x: 0, y: 0 } }
  )
    .plainText("Test case 2 (scene.local)")
    .build();

    const item2 = buildImage(
      {
        height: 200,
        width: 2000,
        url: "https://pub-0765502852f44e9dbc7e1096fd576161.r2.dev/JB2A_DnD5e/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Blue_4000x400.webm",
        mime: "video/webm",
      },
      { dpi: 300, offset: { x: 0, y: 0 } }
    )
      .position({ x: 0, y: 400 })
      .plainText("Test case 2 (scene.items)")
      .build();
  
  OBR.scene.local.addItems([item]);
  OBR.scene.items.addItems([item2]);
  localTestItems.push(item);
  sceneTestItems.push(item2);
});

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
