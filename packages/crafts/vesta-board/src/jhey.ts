import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4';
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0';

gsap.defaults({
  duration: 1,
  ease: 'none',
});

const flips = {};

const config = {
  theme: 'dark',
  perspective: 1,
  length: 10,
  characters: 'abcdefghijklmnopqrstuvwxyz!',
};

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
});

const update = () => {
  document.documentElement.dataset.theme = config.theme;
  document.documentElement.dataset.explode = config.explode;
  document.documentElement.style.setProperty('--perspective', config.perspective);
};

const sync = event => {
  if (!document.startViewTransition || event.target.controller.view.labelElement.innerText !== 'Theme') return update();
  document.startViewTransition(() => update());
};

ctrl.addBinding(config, 'perspective', {
  min: 0.5,
  max: 4,
  step: 0.1,
  label: 'perspective',
});
ctrl
  .addBinding(config, 'length', {
    min: 4,
    max: 20,
    step: 1,
    label: 'length',
  })
  .on('change', () => {
    for (const flip of Object.values(flips)) flip.flipper.lineLength = config.length;
  });
ctrl.addBinding(config, 'theme', {
  label: 'theme',
  options: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
});

ctrl.on('change', sync);
update();

const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
class FlipSlot {
  constructor(options = {}) {
    const { characters = DEFAULT_CHARACTERS, color = 'canvasText', pad = 0 } = options;
    this.characters = Array.from(` ${characters} `);
    this.colorSet = color;
    this.pad = pad;
    this.element = this.create();
    this.generateTimeline();
  }
  set chars(value) {
    this.characters = Array.from(` ${value} `);
    this.generateTimeline();
  }
  set color(value) {
    this.element?.style.setProperty('--color', value);
  }
  create() {
    const element = Object.assign(document.createElement('div'), {
      className: 'flip',
      style: `--color: ${this.colorSet}`,
      innerHTML: `
        <!-- fold top -->
        <div></div>
        <!-- fold bottom -->
        <div></div>
        <!-- unfold top -->
        <div></div>
        <!-- unfold bottom -->
        <div></div>
      `,
    });
    return element;
  }
  flip(character, delay = 0) {
    // const chars = Array.from(` ${config.characters} `)
    // const desired = config.character
    const { characters: chars, pad, timeline, scrubber } = this;
    const currentIndex = chars.indexOf(chars[timeline.totalTime()]);
    const desiredIndex = chars.indexOf(character) !== -1 ? chars.indexOf(character) : 0;
    // if the current index is greater, loop around
    // we seem to have to add an extra 0.5 to make up for gaps
    const shift =
      currentIndex > desiredIndex ? chars.length - 1 - currentIndex + desiredIndex : desiredIndex - currentIndex;
    // this is how you throw an extra loop in for the stagger
    const padding = currentIndex === desiredIndex ? 0 : pad * (chars.length - 1);
    gsap.to(scrubber, {
      delay,
      totalTime: `+=${shift + padding}`,
      ease: 'power1.out',
      duration: (shift + padding) * gsap.utils.random(0.02, 0.06),
    });
  }
  generateTimeline() {
    const { timeline: currentTimeline, scrubber, element } = this;
    if (currentTimeline) currentTimeline.kill();
    if (scrubber) this.scrubber.kill();

    const [unfoldTop, unfoldBottom, foldTop, foldBottom] = Array.from(element.querySelectorAll('& > div'));
    const chars = this.characters;

    gsap.set([foldTop, unfoldBottom], { clearProps: 'all' });

    unfoldTop.innerText = unfoldBottom.innerText = chars[1];
    foldTop.innerText = foldBottom.innerText = chars[0];

    const timeline = gsap
      .timeline({
        paused: true,
        // account for the extra space
        repeat: chars.length - 2,
        onRepeat: () => {
          const index = Math.floor(timeline.totalTime() / timeline.duration());
          const next = chars[index % chars.length];
          const current = chars[(index + 1) % chars.length];
          unfoldTop.innerText = unfoldBottom.innerText = current;
          foldTop.innerText = foldBottom.innerText = next;
        },
      })
      .fromTo(
        unfoldBottom,
        { rotateX: 180 },
        {
          rotateX: 0,
          duration: 1,
        },
        0,
      )
      .fromTo(
        unfoldTop,
        { filter: 'brightness(0)' },
        {
          filter: 'brightness(1)',
          duration: 1,
        },
        0,
      )
      .fromTo(
        foldTop,
        { rotateX: 0 },
        {
          duration: 1,
          rotateX: -180,
        },
        0,
      )
      .fromTo(
        foldBottom,
        { filter: 'brightness(1)' },
        {
          duration: 1,
          filter: 'brightness(0)',
        },
        0,
      );

    const duration = timeline.totalDuration();
    this.scrubber = gsap.to(timeline, {
      totalTime: duration,
      repeat: -1,
      paused: true,
      duration: duration,
      ease: 'none',
    });
    this.scrubber.time(timeline.totalDuration());
    this.timeline = timeline;
  }
}

class FlipLine {
  constructor(options = {}) {
    const { color, length = 10, pad = 0 } = options;
    this.colorSet = color;
    this.length = length;
    this.padding = pad;
    this.options = options;

    this.setup();
  }
  setup() {
    const { colorSet, length, padding } = this;
    if (this.element) {
      this.element.innerHTML = '';
    } else {
      this.element = Object.assign(document.createElement('div'), {
        className: 'flip-line',
      });
    }
    this.flips = [];
    for (let i = 0; i < length; i++) {
      const newSlot = new FlipSlot({
        pad: padding,
        characters: config.characters,
        color: colorSet,
      });
      this.element.appendChild(newSlot.element);
      this.flips.push(newSlot);
    }
  }
  set lineLength(value) {
    this.length = value;
    this.setup();
  }
  set pad(value) {
    const { flips } = this;
    if (flips) {
      for (let i = 0; i < flips.length; i++) flips[i].pad = value;
    }
  }
  set color(value) {
    const { flips } = this;
    this.colorSet = value;
    if (flips) {
      for (let i = 0; i < flips.length; i++) flips[i].color = value;
    }
  }
  run(update) {
    const letters = Array.from(update.padEnd(10, ' '));
    for (let i = 0; i < Math.min(letters.length, this.length); i++) {
      this.flips[i]?.flip(letters[i], i / 10);
    }
  }
}

const board = document.querySelector('.board');
const addLine = ({ text = '', pad = 1, color = 'hsl(0,0%,90%)', alignment = 'left' }) => {
  const lineConfig = {
    text,
    length: 10,
    pad,
    color: color,
    characters: DEFAULT_CHARACTERS,
    alignment,
    id: crypto.randomUUID(),
  };

  const newLine = new FlipLine({
    length: lineConfig.line,
    color: color,
    pad,
  });
  board.appendChild(newLine.element);

  newLine.run(
    lineConfig.alignment === 'right' ? lineConfig.text.toLowerCase().padStart(10, ' ') : lineConfig.text.toLowerCase(),
  );

  flips[lineConfig.id] = {
    config: lineConfig,
    flipper: newLine,
  };

  const lineFolder = ctrl.addFolder({
    title: 'Line',
    expanded: false,
  });

  lineFolder.addBinding(lineConfig, 'text', {
    label: 'text',
  });
  lineFolder
    .addBinding(lineConfig, 'characters', {
      label: 'characters',
    })
    .on('change', () => {
      for (const flip of newLine.flips) {
        flip.chars = lineConfig.characters;
      }
    });
  lineFolder
    .addBinding(lineConfig, 'pad', {
      label: 'pad',
      min: 0,
      max: 4,
      step: 1,
    })
    .on('change', () => {
      newLine.pad = lineConfig.pad;
    });
  lineFolder.addBinding(lineConfig, 'alignment', {
    options: {
      left: 'left',
      right: 'right',
    },
  });
  lineFolder
    .addBinding(lineConfig, 'color', {
      view: 'color',
      color: { alpha: true },
    })
    .on('change', () => {
      newLine.color = lineConfig.color;
    });
  // create a flipper
  lineFolder.addButton({ title: 'Run' }).on('click', () => {
    newLine.run(
      lineConfig.alignment === 'right'
        ? lineConfig.text.toLowerCase().padStart(10, ' ')
        : lineConfig.text.toLowerCase(),
    );
  });
  lineFolder.addButton({ title: 'Remove' }).on('click', () => {
    // must delete the item from flippers
    delete flips[lineConfig.id];
    ctrl.remove(lineFolder);
    newLine.element.remove();
  });
};
ctrl.addButton({ title: 'Play' }).on('click', () => {
  for (const line of Object.values(flips)) {
    line.flipper.run(
      line.config.alignment === 'right'
        ? line.config.text.toLowerCase().padStart(10, ' ')
        : line.config.text.toLowerCase(),
    );
  }
});
ctrl.addButton({ title: 'Blank' }).on('click', () => {
  for (const line of Object.values(flips)) {
    line.flipper.run('');
  }
});
ctrl.addButton({ title: 'Add Line' }).on('click', addLine);
// addLine({
//   text: 'You can',
//   pad: 1,
//   alignment: 'right',
// })
// addLine({
//   text: 'just ship',
//   pad: 2,
//   alignment: 'right',
// })
// addLine({
//   text: 'things',
//   pad: 3,
//   alignment: 'right',
// })
// addLine({
//   text: 'on time',
//   pad: 4,
//   alignment: 'right',
//   color: 'hsl(44,82%,49%)',
// })

addLine({
  text: 'Babe!',
  pad: 1,
  alignment: 'left',
});
addLine({
  text: 'new craft',
  pad: 2,
  alignment: 'right',
});
addLine({
  text: 'of ui',
  pad: 3,
  alignment: 'right',
});
addLine({
  text: 'dropped',
  pad: 4,
  alignment: 'right',
  color: 'hsl(44,82%,49%)',
});
