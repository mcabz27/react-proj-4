import AccessingArgumentsExample from "./AccessingArgumentsExample";

import GettingPropertiesExample from "./GettingPropertiesExample";

AccessingArgumentsExample.__raw = require(`!raw!./AccessingArgumentsExample`);
GettingPropertiesExample.__raw = require(`!raw!./GettingPropertiesExample`);

export {
  AccessingArgumentsExample,
  GettingPropertiesExample,
};
