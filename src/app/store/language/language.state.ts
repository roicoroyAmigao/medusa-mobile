import { Injectable } from '@angular/core';
import { DeviceInfo } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { LanguageActions } from './language.actions';

export class LanguageStateModel {
    language: any;
    device: DeviceInfo;
}
@State<LanguageStateModel>({
    name: 'language',
    defaults: {
        language: null,
        device: null,
    }
})
@Injectable()
export class LanguageState {

    constructor(
        public translate: TranslateService
    ) { }

    @Selector()
    static getLanguage(state: LanguageStateModel) {
        return state.language;
    }

    @Action(LanguageActions.GetLanguage)
    getLanguage(ctx: StateContext<LanguageStateModel>) {
        const state = ctx.getState();
        return state.language;
    }

    @Action(LanguageActions.SetLanguageDeviceInfo)
    setLanguage(ctx: StateContext<LanguageStateModel>, { language, device }: LanguageActions.SetLanguageDeviceInfo) {
        const state = ctx.getState();
        this.translate.use(language)
            .subscribe((res) => {
                // console.log(res);
                this.getTranslations();
                ctx.patchState({
                    ...state,
                    language: language,
                    device: device != null ? device : null,
                });
            });
    }
    getTranslations() {
        this.translate.getTranslation(this.translate.currentLang);
    }
}
