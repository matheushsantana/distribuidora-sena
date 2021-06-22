import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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
    password: this.formRegister.value.password1,
    fotoPerfil: ''
  }
  this.authService.register(newUser)
  .subscribe(
    (u)=>{ alert('Registrado com Sucesso!')
      this.router.navigateByUrl('/');
    },
    (err) => {
      console.log(err)
      alert('Erro ao Cadastrar!')
    }
  );
}


}
