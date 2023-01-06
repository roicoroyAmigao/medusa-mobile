import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { AuthRoutePath } from 'src/app/auth/route-path.enum';
import { OrderReviewFacade } from './order-review.facade';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.page.html',
  styleUrls: ['./order-review.page.scss'],
})
export class OrderReviewPage implements OnInit {

  viewState$: Observable<any>;

  constructor(
    private facade: OrderReviewFacade,
    private navigation: NavigationService,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      console.log(state);
    });
  }

  ngOnInit() {
  }

  home() {
    this.navigation.navigateForward(AuthRoutePath.home, 'forward');
  }

  back() {
    this.navigation.navigateForward(AuthRoutePath.payment, 'back');
  }

}
