import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  protected year: Date | undefined;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent, {
      autoFocus: false,
      data: {
        dialogTitle: 'About app',
        message: "Front end part of the application"
      },
      width: '400px'
    });
  }
}
