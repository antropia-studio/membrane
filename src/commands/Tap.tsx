import { type AsyncCommand } from 'fast-check';

import { type DetoxMatcher, getElement } from '../detox/matcher.js';

export interface TapProps {
  matcher: Detox.NativeMatcher | string;
}

type Model = { numberOfTaps: number };

export class Tap implements AsyncCommand<Model, never> {
  private readonly matcher: DetoxMatcher;

  constructor({ matcher }: TapProps) {
    this.matcher = matcher;
  }

  check(_m: Model): boolean {
    return true;
  }

  async run(m: Model): Promise<void> {
    await getElement(this.matcher).tap();

    m.numberOfTaps += 1;
  }

  toString(): string {
    return `Tap ${this.matcher}`;
  }
}
