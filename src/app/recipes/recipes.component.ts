import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public isCollapsed = false;
  public small_screen = false;

  constructor() { }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.small_screen = window.innerWidth <= 768;
  }

  getRecipe($event) {
    if ( this.small_screen ) {
      this. isCollapsed = !this.isCollapsed;
    }
  }

}
