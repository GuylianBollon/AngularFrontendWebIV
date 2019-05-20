import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatInputModule, MatListModule, MatOptionModule, MatSelectModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
