import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** App name */
  appName = env.appName;

  /** Show filler */
  showFiller: boolean;

  /** General & Sidenav links */
  generalLinks = [
    {
      routerLink: ['/'],
      i18n: 'home',
      icon: 'home',
    },
    {
      routerLink: ['/games/pokemon'],
      i18n: 'pokemon',
      icon: 'catching_pokemon',
    },
    {
      routerLink: ['/games/yu-gi-oh'],
      i18n: 'yu-gi-oh',
      icon: 'change_history',
    },
  ];

  /** Constructor */
  constructor(public router: Router, private location: Location) {}

  /** Initialize show filler */
  ngOnInit() {
    const showFiller = localStorage.getItem(env.storage.keys.generalSideNav);
    this.showFiller = showFiller === null ? true : showFiller === 'true';
  }

  /** Get general links */
  getLinksGeneral() {
    return this.generalLinks;
  }

  /** Check if show links */
  showLinks() {
    return window.innerWidth <= 1175;
  }

  /** Check if show icon */
  showIcon() {
    return window.innerWidth <= 500;
  }

  /** Get sidenav mode */
  getSidenavMode() {
    return this.showLinks() ? 'over' : 'side';
  }

  /** Get sidenav width */
  getSidenavStyle() {
    return { width: this.showFiller ? '250px' : '49px' };
  }

  /** Toggle filler */
  toggleFiller() {
    this.showFiller = !this.showFiller;
    localStorage.setItem(env.storage.keys.generalSideNav, `${this.showFiller}`);
  }

  /** Back button click */
  onBackButtonClick() {
    this.location.back();
  }

  /** Forward button click */
  onForwardButtonClick() {
    this.location.forward();
  }
}
