/**
 * @name DontTrackMe
 * @author HideakiAtsuyo
 * @authorId 963506730141093909
 * @version 1.0.0
 * @description Allows you to block Discord tracking
 * @donate https://www.paypal.me/HideakiAtsuyoLmao
 * @website https://github.com/HideakiAtsuyo
 * @source https://github.com/HideakiAtsuyo/DontTrackMe/tree/plugin/
 * @updateUrl https://raw.githubusercontent.com/HideakiAtsuyo/DontTrackMe/plugin/DontTrackMe.plugin.js
 */

class DontTrackMe {
    // Constructor
    constructor() {
        this.initialized = false;
        this.config = {
            name: "DontTrackMe",
            shortName: "DTM",
            description: "Prevent Tracking & Monitoring ",
            version: "1.0.0",
            author: "Hideaki Atsuyo"
        }
    }

    // Meta
    getName() {
        return this.config.name;
    }
    getShortName() {
        return this.config.shortName;
    }
    getDescription() {
        return this.config.description;
    }
    getVersion() {
        return this.config.version;
    }
    getAuthor() {
        return this.config.author;
    }

    // Settings  Panel
    getSettingsPanel() {
        return "<!--Enter Settings Panel o, just standard HTML-->";
    }

    // Load/Unload
    async load() {
        window.oldConsoleLog = console.log;

        const Reporter = await BdApi.findModuleByProps("submitLiveCrashReport");
        const AnalyticsMarker = await BdApi.findModuleByProps("analyticsTrackingStoreMaker");

        Reporter["submitLiveCrashReport"] = () => void 0;
        AnalyticsMarker["AnalyticsActionHandlers"]["handleTrack"] = () => void 0;

        window.__SENTRY__.hub.addBreadcrumb = () => void 0;
        window.__SENTRY__.hub.getClient().close();
        window.__SENTRY__.hub.getScope().clear();

        // a bit unrelated but shut up flux
        console.log = (...args) => {
            if (typeof args[0] === 'string' && args[0].includes('[Flux]')) return;
            window.oldConsoleLog.call(console, ...args);
        };
    }

    unload() { }

    onMessage() { };

    onSwitch() { };

    observer(e) { };

    // Start/Stop
    start() {
        this.initialize();
    }

    stop() { };

    //  Initialize
    initialize() {
        this.initialized = true;
    }

}
