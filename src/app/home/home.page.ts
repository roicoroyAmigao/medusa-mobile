
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthRoutePath } from '../auth/route-path.enum';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { HomeFacade } from './home.facade';
import { CategoriesActions } from '../store/categories/categories.actions';
import { IAppCategories } from '../store/categories/categories.service';
import { IHeaderData } from 'projects/components/src/lib/components/header/header.component';
import { ICategoriesList } from 'projects/components/src/lib/components/categories/categories.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomePage {

    viewState$: Observable<any>;

    categoriesData: ICategoriesList[] = [

    ];

    constructor(
        private navigation: NavigationService,
        private facade: HomeFacade,
        private auth: AppAuthService,
    ) {
        this.viewState$ = this.facade.viewState$;
        // this.viewState$.subscribe((state) => {
        //     console.log(state);
        // });
        this.categoriesData.push({
            id: '1',
            url: 'products-list',
            title: 'Products',
            image: 'assets/shapes.svg',
        })
    }

    enterTestPage() {
        this.navigation.navigateForward('/test', 'forward');
    }
    enterShop() {
        this.navigation.navigateForward('/shop/products-list', 'forward');
    }
    login() {
        this.navigation.navControllerDefault(AuthRoutePath.login);
    }
    logout() {
        this.auth.logout();
    }
}