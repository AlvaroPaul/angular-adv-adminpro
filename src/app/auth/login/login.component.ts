import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  //@ViewChild('googleBtn') declare googleBtn: ElementRef ;
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  loginForm: FormGroup;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '646875269287-87n7gi1smpt8k18n3mcm9dsc3pbcemlq.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        //console.log({ login: resp })
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      })
  }

  /*recordarme = () => {
    if( localStorage.getItem('email') === null ){
      return false;
    } else {
      return true;
    }
  }

  getStoreCheck(): boolean{
    return localStorage.getItem('email') ? true : false
  }
 
  getStoreEmail() : string {
    return localStorage.getItem('email') || ''
  }
*/

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { 

                this.loginForm = this.fb.group({
                  email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
                  password: ['', Validators.required ],
                  remember: [false]
                  //remember: [ this.recordarme() ]
                });
              
               }

  login(){

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp)
        /*
        if ( this.loginForm.get('remember').value ){
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }*/

        //navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });



  }

  //VOLVER A REVISAR, METODOS QUE NO ESTAN 
  //renderbutton
  //startApp
  //attachSingin

  /*renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }*/

}
