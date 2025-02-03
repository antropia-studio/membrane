import type { Tagged } from '@madeja-studio/cepillo';

import { type Direction } from 'detox/detox';
import { type AsyncCommand } from 'fast-check';

import { type DetoxMatcher, getElement } from '../detox/matcher.js';

export interface SwipeProps {
  direction: Direction;
  matcher: Detox.NativeMatcher | string;
  variant?: SwipeVariant;
}

export type SwipeVariant = Tagged<'pager', { numberOfPages: number }>;

type Model = { swipeOffset: number };

export class Swipe implements AsyncCommand<Model, never> {
  private readonly direction: Direction;
  private readonly matcher: DetoxMatcher;
  private readonly variant?: SwipeVariant;

  constructor({ direction, matcher, variant }: SwipeProps) {
    this.matcher = matcher;
    this.direction = direction;
    this.variant = variant;
  }

  check(m: Model): boolean {
    switch (this.variant?.tag) {
      case 'pager':
        return !(
          (m.swipeOffset <= 0 && this.direction === 'right') ||
          (m.swipeOffset >= this.variant.numberOfPages - 1 &&
            this.direction === 'left')
        );
      case undefined:
        return true;
    }
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
    switch (this.variant?.tag) {
      case 'pager':
        return `Pager Swipe ${this.direction} on ${this.matcher}`;
      case undefined:
        return `Swipe ${this.direction} on ${this.matcher}`;
    }
  }
}
