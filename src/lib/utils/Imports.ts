/*
 * There was some weirdness with webpack/rollup breaking when picking one style over the other
 * So it's easier to debug those issues in one place
 */

import classNames_A from "classnames";
import * as classNames_B from "classnames";
export const classNames = classNames_A || classNames_B;


