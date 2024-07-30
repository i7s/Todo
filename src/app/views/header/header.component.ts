import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()
  categoryName: string = '';

  @Input()
  showStat: boolean = true;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  onToggleStat() {
    this.toggleStat.emit(!this.showStat); // вкл/выкл статистику
  }
}
