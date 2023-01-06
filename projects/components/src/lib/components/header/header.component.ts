import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { AuthRoutePath } from 'src/app/auth/route-path.enum';

export interface IHeaderData {
  avatar: string,
}
@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() set headerData(value: IHeaderData | any) {
    // console.log(value);
    this._headerAvatar = value.avatar ? value.avatar : 'assets/shapes.svg';
    this._isLoggedIn = value.isUserLoggedIn && value.isCustomerLoggedIn ? true : false;
  };

  get headerAvatar(): string {
    return this._headerAvatar;
  }
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  private _headerAvatar: string;
  private _isLoggedIn: boolean;

  constructor(
    private navigation: NavigationService,
    private auth: AppAuthService,
    private store: Store,
    public menu: MenuController,
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // console.log(this.headerData);
    // console.log(this.headerAvatar);
  }

  closeMenu(menuId: string = 'start') {
    this.menu.toggle(menuId);
  }

  home() {
    this.navigation.navigateForward('/home', 'forward');
  }

  login() {
    this.navigation.navControllerDefault(AuthRoutePath.login);
  }

  logout() {
    this.auth.logoutUser();
  }

}
