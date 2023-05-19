import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlatformModule } from '@angular/cdk/platform';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    PlatformModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
