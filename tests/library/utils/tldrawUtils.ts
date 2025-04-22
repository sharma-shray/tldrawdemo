import { Page, expect } from "@playwright/test";

// Draw a rectangle and returns its center point
export async function drawRectangle(
  page: Page,
  start: { x: number; y: number },
  size: number = 100
): Promise<{ x: number; y: number }> {
  await page.getByTestId("tools.rectangle").click();
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + size, start.y + size, { steps: 10 });
  await page.mouse.up();

  return {
    x: start.x + size / 2,
    y: start.y + size / 2,
  };
}

// Draws an arrow from point A to point B
export async function drawArrow(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  await page.getByTestId("tools.arrow").click();
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 10 });
  await page.mouse.up();
}

export async function verifyArrowSnappedToTarget(
  page: Page,
  expectedEnd: { x: number; y: number }
) {
  const arrows = page.locator('.tl-shape[data-shape-type="arrow"]');
  const count = await arrows.count();
  expect(count).toBeGreaterThan(0);

  // Get the transform position of the arrow (origin point)
  const arrowBox = await arrows.nth(0).boundingBox();
  if (!arrowBox) throw new Error("Arrow shape not found");

  const arrowEndX = arrowBox.x + arrowBox.width / 2;
  const arrowEndY = arrowBox.y + arrowBox.height / 2;

  const threshold = 300; // pixels of leeway for matching

  const dx = Math.abs(arrowEndX - expectedEnd.x);
  const dy = Math.abs(arrowEndY - expectedEnd.y);

  expect(dx).toBeLessThanOrEqual(threshold);
  expect(dy).toBeLessThanOrEqual(threshold);
}
