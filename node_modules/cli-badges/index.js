const clc = require('cli-color');
const terminalLink = require('terminal-link');
const themes = require('./themes.js');

const formatters = {
    bold: (clc, s) => clc.bold(s),
    italic: (clc, s) => clc.italic(s),
    inverse: (clc, s) => clc.inverse(s),
    blink: (clc, s) => clc.blink(s),
    strike: (clc, s) => clc.strike(s),
    underline: (clc, s) => clc.underline(s),
};
const validXtermColor = (val) => (val < 255 && val > 0);
const isString = (val) => typeof val === 'string';
const colorExists = (val) => val in clc;
const bgColorExists = (val) => `bg${cappitalize(val)}` in clc;
const themeExists = (val) => val in themes;

const paddToFitWidth = (string, width) => {
    const sLength = string.length;

    if (!width) width = sLength + 2; // one space on each side

    const halfWith = Math.ceil((width - sLength) / 2);
    const paddStr = ' '.repeat(halfWith);

    return paddStr + string + paddStr;
};

const cappitalize = (string) => {
    return string.charAt(0).toUpperCase()
        + string.substring(1, string.length);
};

const getBgColor = (clc, color) => {
    const isValidNumber = validXtermColor(color);
    const isValidString = isString(color) && bgColorExists(color);
    if (isValidNumber) return clc.bgXterm(color);
    if (isValidString) return clc[`bg${cappitalize(color)}`];

    return clc.bgBlue;
};

const getTextColor = (clc, color) => {
    const isValidNumber = validXtermColor(color);
    const isValidString = isString(color) && colorExists(color);

    if (isValidNumber) return clc.xterm(color);
    if (isValidString) return clc[color];

    return clc.white;
};

const format = (clc, s, formatter) => {
    let f = formatters[formatter];
    return f ? f(clc, s) : clc(s);
};

const getOptionsForTheme = (theme, swapTheme) => {
    if (!themeExists(theme)) {
        return {};
    }

    const themeOpts = { ...themes[theme] };

    if (swapTheme) {
        const pLblColor = themeOpts.labelColor;
        themeOpts.labelColor = themeOpts.messageColor;
        themeOpts.messageColor = pLblColor;

        const pLblBg = themeOpts.labelBg;
        themeOpts.labelBg = themeOpts.messageBg;
        themeOpts.messageBg = pLblBg;
    }

    return themeOpts;
};

const DEFAULT_OPTIONS = {
    messageBg: 'blue',
    labelBg: 'blackBright',
    labelColor: 'white',
    messageColor: 'white',
    messageStyle: null,
    messageWidth: null,
    labelStyle: null,
    labelWidth: null,
    link: null,
    forceLink: false,
    theme: 'blue',
    swapTheme: false,
    ...themes['blue'],
};

const makeBadge = (label = '', message = '', options = {}) => {
    const themeOpts = getOptionsForTheme(options.theme, options.swapTheme);

    const {
        messageBg, messageColor, messageStyle, messageWidth,
        labelBg, labelColor, labelStyle, labelWidth,
        link, forceLink,
    } = { ...DEFAULT_OPTIONS, ...options, ...themeOpts, };

    if (themeOpts.label) label = themeOpts.label;
    if (themeOpts.message) message = themeOpts.message;

    const lblColorer = getTextColor(getBgColor(clc, labelBg), labelColor);
    const msgColorer = getTextColor(getBgColor(clc, messageBg), messageColor);

    const paddedLbl = paddToFitWidth(label, labelWidth);
    const paddedMsg = paddToFitWidth(message, messageWidth);

    const lblFormatted = format(lblColorer, paddedLbl, labelStyle);
    const msgFormatted = format(msgColorer, paddedMsg, messageStyle);

    const badge = `${label && lblFormatted}${message && msgFormatted} `;
    const makeLink = link && terminalLink.isSupported;

    return (makeLink || forceLink) ? terminalLink(badge, link) : badge;
};

const createThemeFn = (theme) => {
    const themeFn = (label, message, options = {}) => makeBadge(label, message, { ...options, theme });
    themeFn.swapped = (label, message, options) => themeFn(label, message, { ...options, swapTheme: true });
    return themeFn;
};

// Create theme methods
const themeNames = Object.keys(themes);
const registerThemeFn = (name) => {
    makeBadge[name] = createThemeFn(name);
}
themeNames.forEach(registerThemeFn);

// function to add new theme
makeBadge.addTheme = (name, options) => {
    themes[name] = options;
    registerThemeFn(name);
};

// Shorthand for createThemeFn
makeBadge.theme = (theme) => createThemeFn(theme);

module.exports = { badge: makeBadge };
