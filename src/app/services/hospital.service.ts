import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    constructor( private http: HttpClient ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }
  
    get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /*get headers(): any  {
    return {
        'x-token': this.token
    };
  }*/

  /*cargarHospitales( ): Observable<Hospital[]> {
 
    const url = `${ base_url }/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url,
        {
          headers: {
            'x-token': this.token
          }
        })
          .pipe(
            //map( (resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales )
            map( (resp: any) => resp.hospitales )
          );
 
  }*/

/*
  cargarHospitales( ): Observable<Hospital[]> {
 
    const url = `${ base_url }/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>( url, this.headers )
            .pipe(
              map( (resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales )
              //map<any,Hospital[]>( (resp:{ok:boolean,hospitales:Hospital[],total:number}) => resp.hospitales));
              //map( (resp: any) => resp.hospitales )
            );
 
  }*/

  /*cargarHospitales(desde: number = 0)

  {

    return this.http.get(`${base_url}/hospitales?desde=${desde}`, this.headers).pipe(

      map<any,Hospital[]>( (resp:{ok:boolean,hospitales:Hospital[],total:number}) => resp.hospitales));

  }*/
//mio
    cargarHospitales( ) {

      const url = `${ base_url }/hospitales`;
      //return this.http.get<{ ok: boolean, hospitales: Hospital[] }>( url, this.headers )
      return this.http.get<{ ok: boolean, hospitales: Hospital[] }>( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
          //map( (resp: any) => resp.hospitales )
        );
              
    }

    crearHospital( nombre: string ) {

      const url = `${ base_url }/hospitales`;
      return this.http.post( url, { nombre }, this.headers );
                  
    }

    actualizarHospital( _id: string, nombre: string ) {

      const url = `${ base_url }/hospitales/${ _id }`;
      return this.http.put( url, { nombre }, this.headers );
                      
    }

    borrarHospital( _id: string ) {

      const url = `${ base_url }/hospitales/${ _id }`;
      return this.http.delete( url, this.headers );
        
    }

    /*cargarHospitales() {
      const url = `${ base_url }/hospitales`;
      return this.http.get( url, { headers: { 'x-token': this.token }, responseType: 'json' } )
              .pipe(
                //map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
                map( (resp: any) => resp.hospitales )
              );
    }*/

}
