import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./layout/top-bar/top-bar.component";
import { SideBarComponent } from "./layout/side-bar/side-bar.component";
import { BodyComponent } from "./layout/body/body.component";
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [TopBarComponent, SideBarComponent, BodyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dockerfile-builder-ng';
}
