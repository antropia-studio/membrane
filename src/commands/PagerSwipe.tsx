import { type Direction } from 'detox/detox';
import { type AsyncCommand } from 'fast-check';

import { type DetoxMatcher, getElement } from '../detox/matcher.js';

interface ConstructorProps {
  direction: Direction;
  matcher: Detox.NativeMatcher | string;
  numberOfPages: number;
}

type Model = { swipeOffset: number };

export class PagerSwipe implements AsyncCommand<Model, never> {
  private readonly direction: Direction;
  private readonly matcher: DetoxMatcher;
  private readonly numberOfPages: number;

  constructor({ direction, matcher, numberOfPages }: ConstructorProps) {
    this.matcher = matcher;
    this.direction = direction;
    this.numberOfPages = numberOfPages;
  }

  check(m: Model): boolean {
    if (m.swipeOffset <= 0 && this.direction === 'right') return false;
    if (m.swipeOffset >= this.numberOfPages - 1 && this.direction === 'left')
      return false;

    return true;
  }

  async run(m: Model): Promise<void> {
    await getElement(this.matcher).swipe(this.direction);

    switch (this.direction) {
      case 'left':
        m.swipeOffset += 1;
        break;
      case 'right':
        m.swipeOffset -= 1;
        break;
    }
  }

  toString(): string {
    return `Pager Swipe ${this.direction}`;
  }
}
