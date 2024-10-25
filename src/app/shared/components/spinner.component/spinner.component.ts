import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from '@services';


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    @if(spinner$ | async){
    <div class="spinner-overlay">
      <p-progressSpinner></p-progressSpinner>
    </div>
  }
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `]
})
export class SpinnerComponent {
  spinnerService = inject(SpinnerService)
  spinner$ = this.spinnerService.spinner$;

}
