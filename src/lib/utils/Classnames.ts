//classnames was giving some issues from webpack rollup, easier to play with settings in one place:
//this is an _ugly_ workaround...

import classNames_Rollup from "classnames";
import * as classNames_Webpack from "classnames";

export const classNames = classNames_Rollup || classNames_Webpack;

