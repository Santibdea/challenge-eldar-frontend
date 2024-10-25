import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'; 
import { ToolbarModule } from 'primeng/toolbar'; 
import { Store } from '@ngrx/store';
import { TokenService } from '@services';
import { Router } from '@angular/router';
import { LoginComponent } from '@views/public/login/login.component';
import { IonAvatar, IonButton } from "@ionic/angular/standalone";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonButton, IonAvatar, CommonModule, ButtonModule, ToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private store = inject(Store<{ user: any }>);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  avatar: string | undefined = undefined;

  protected email : string = ''

  ngOnInit(): void {
    this.handleUserAndRole()
  }
  
  handleLogout() {
    this.tokenService.resetToken()
    this.router.navigate([LoginComponent.PATH])
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera 
    });

    this.avatar = image.dataUrl;
  }


  handleUserAndRole() {
    this.store.select('user').subscribe((state) => {
      if (state && state.user) {
        this.email = state.user.email;
      }
    });
  }
}
