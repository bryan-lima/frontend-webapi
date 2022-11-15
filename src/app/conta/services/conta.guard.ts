import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { LocalStorageUtils } from "../../utils/localstorage";

@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent> {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: CadastroComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }

    return true;
  }

  canActivate() {
    if (this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/home']);
    }

    return true;
  }
}
