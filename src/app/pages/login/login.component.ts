import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup; //como exclamacao para dizer que sera declarado
 ;

  constructor(
    private router: Router, // criado para direcionar as paginas
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    
    this.loginForm = new  FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])// nenhuma senha pode ser menor do que 6 caracteres
    })

  }
  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => this.toastService.success ("Logged successful"),
        error: () => this.toastService.error("Error try again later")
    })
  }
  navigate(){
    this.router.navigate(["signup"])// essa propriedade leva para a pagina de signup quando clica no botao signup "observe o router no comeco do constructor"
  }
}
