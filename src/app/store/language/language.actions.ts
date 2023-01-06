import { DeviceInfo } from "@capacitor/device";

export namespace LanguageActions {

    export class GetLanguage {
        static readonly type = '[LanguageActions] Get Language';
    }
    export class SetLanguageDeviceInfo {
        static readonly type = '[LanguageActions] Set Language Device Info';
        constructor(public language: string, public device?: DeviceInfo) { }
    }

}
