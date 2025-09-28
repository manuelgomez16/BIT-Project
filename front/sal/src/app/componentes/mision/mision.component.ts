import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-mision',
  imports: [FooterComponent, SidebarComponent],
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css'
})
export class MisionComponent {

}