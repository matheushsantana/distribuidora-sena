import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    'firstname': ['' , [Validators.required] ],
    'email': ['',[Validators.required, Validators.email] ],
    'password1': ['', [Validators.required, Validators.minLength(6)] ],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
}, 
{validator: this.mathingPasswords});

states = ['MT', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private appComponet: AppComponent) { 
  this.appComponet.ativaNav = false; }
entrou = false;

ngOnInit(): void {
}

mathingPasswords(group: FormGroup){
  if(group){
    const password1 = group.controls['password1'].value;
    const password2 = group.controls['password2'].value;
    if ( password1 == password2){
      return null;
    }
  }
  return { matching: false};
}

onSubmit(){
  const newUser: User = {
    firsname: this.formRegister.value.firstname,
    email: this.formRegister.value.email,
    fotoPerfil: 'assets/foto-perfil-generica.png',
    tipo: 'cliente'
  }
  this.authService.register(newUser, this.formRegister.value.password1)
  .subscribe(
    (u)=>{ alert('Registrado com Sucesso!')
      window.location.href = '/'

    },
    (err) => {
      console.log(err)
      alert('Erro ao Cadastrar!')
    }
  );
  this.escondeTela();
}

escondeTela(){
  var site = document.getElementById('component').style
      site.display = 'none';
      var carregamento = document.getElementById('carregando')
      carregamento.classList.add("hide")
      this.entrou = true;
}

}
