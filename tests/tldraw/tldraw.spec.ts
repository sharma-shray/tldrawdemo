import { test } from "@playwright/test";
import {
  drawArrow,
  drawRectangle,
  verifyArrowSnappedToTarget,
} from "../library/utils/tldrawUtils";

test("create two rectangles and connect with an arrow", async ({ page }) => {
  await page.goto("https://www.tldraw.com/");
  // baseurl not centralised as it is
  // a part of another pack please refer to playwright config file for more details on that

  const canvas = page.locator('[data-testid="canvas"]');
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) throw new Error("Canvas not found");

  // Create first rectangle
  const rect1Center = await drawRectangle(page, {
    x: canvasBox.x + 100,
    y: canvasBox.y + 100,
  });

  // Create second rectangle
  const rect2Center = await drawRectangle(page, {
    x: canvasBox.x + 400,
    y: canvasBox.y + 100,
  });

  // Draw arrow between the two rectangles
  await drawArrow(page, rect1Center, rect2Center);

  // Verify the arrow snapped to an edge
  await verifyArrowSnappedToTarget(page, rect2Center);
});
