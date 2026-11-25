# Playwright Keyboard and Mouse Actions

## Keyboard Actions

| Function | Example | Purpose |
|---|---|---|
| `page.keyboard.press()` | `await page.keyboard.press('A')` | Press and release a key |
| `page.keyboard.down()` | `await page.keyboard.down('Shift')` | Hold a key down |
| `page.keyboard.up()` | `await page.keyboard.up('Shift')` | Release a held key |
| `page.keyboard.type()` | `await page.keyboard.type('Hello')` | Type text character by character |
| `page.keyboard.insertText()` | `await page.keyboard.insertText('Hello')` | Insert text directly |

### Modifier Keys

- `Control`
- `Shift`
- `Alt`
- `Meta`
- `ControlOrMeta`

### Common Key Names

- `Enter`
- `Escape`
- `Tab`
- `Backspace`
- `Delete`
- `ArrowUp`
- `ArrowDown`
- `ArrowLeft`
- `ArrowRight`
- `Home`
- `End`
- `PageUp`
- `PageDown`
- `CapsLock`
- `Space`
- Function keys: `F1` through `F12`

### Keyboard Combinations

```typescript
await page.keyboard.press('Control+A');
await page.keyboard.press('Shift+Tab');
await page.keyboard.press('ControlOrMeta+C');
await page.keyboard.down('Shift');
await page.keyboard.press('ArrowDown');
await page.keyboard.up('Shift');
```

## Mouse Actions

Mouse actions can be performed using a locator or through `page.mouse`.

| Function | Example | Purpose |
|---|---|---|
| `locator.click()` | `await page.locator('#button').click()` | Move the mouse to an element and click it |
| `locator.dblclick()` | `await page.locator('#button').dblclick()` | Double-click an element |
| `locator.hover()` | `await page.locator('#menu').hover()` | Move the mouse over an element |
| `locator.dragTo()` | `await source.dragTo(target)` | Drag an element to another element |
| `page.mouse.move()` | `await page.mouse.move(100, 200)` | Move the mouse to a page position |
| `page.mouse.down()` | `await page.mouse.down()` | Press and hold a mouse button |
| `page.mouse.up()` | `await page.mouse.up()` | Release a held mouse button |
| `page.mouse.click()` | `await page.mouse.click(100, 200)` | Move and click at a page position |
| `page.mouse.dblclick()` | `await page.mouse.dblclick(100, 200)` | Move and double-click at a page position |
| `page.mouse.wheel()` | `await page.mouse.wheel(0, 500)` | Scroll horizontally or vertically |

Coordinates use pixels measured from the top-left corner of the page. The mouse position must be moved first for `click()`, `dblclick()`, `down()`, and `up()` when using `page.mouse`.

### Click Methods

```typescript
await page.locator('#submit').click();
await page.locator('#submit').dblclick();
await page.locator('#submit').click({ button: 'right' });
await page.locator('#submit').click({ button: 'middle' });
await page.locator('#submit').click({ clickCount: 2 });
await page.locator('#submit').click({ delay: 500 });
await page.locator('#submit').click({ modifiers: ['Control'] });
await page.locator('#submit').click({ force: true });
```

Available mouse buttons:

- `left`
- `right`
- `middle`

Modifier keys can be used with clicks:

- `Alt`
- `Control`
- `Meta`
- `Shift`

### Hover

```typescript
await page.locator('#menu').hover();
await page.locator('#menu-item').hover({ position: { x: 10, y: 20 } });
await page.locator('#menu').hover({ force: true });
```

Hover is commonly used to display tooltips, dropdown menus, or reveal hidden controls.

### Low-Level Mouse Movement

```typescript
await page.mouse.move(100, 200);
await page.mouse.move(300, 400, { steps: 10 });
```

The `steps` option divides the movement into multiple intermediate moves. This is useful for smooth movement and drag actions.

### Mouse Down and Mouse Up

```typescript
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(300, 300);
await page.mouse.up();
```

Use the button name when working with a button other than the left mouse button:

```typescript
await page.mouse.down({ button: 'right' });
await page.mouse.up({ button: 'right' });
```

### Drag and Drop with a Locator

```typescript
const source = page.locator('#source');
const target = page.locator('#target');

await source.dragTo(target);
```

With options:

```typescript
await source.dragTo(target, {
  sourcePosition: { x: 10, y: 10 },
  targetPosition: { x: 50, y: 50 }
});
```

### Manual Drag with page.mouse

```typescript
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(300, 300, { steps: 10 });
await page.mouse.up();
```

### Mouse Click at Coordinates

```typescript
await page.mouse.click(100, 200);
await page.mouse.dblclick(100, 200);
await page.mouse.click(100, 200, { button: 'right' });
await page.mouse.click(100, 200, { button: 'middle' });
```

### Mouse Wheel

```typescript
await page.mouse.wheel(0, 500);
await page.mouse.wheel(0, -500);
await page.mouse.wheel(500, 0);
```

- Positive vertical value scrolls down.
- Negative vertical value scrolls up.
- Positive horizontal value scrolls right.
- Negative horizontal value scrolls left.
