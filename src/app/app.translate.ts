import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient, platformId: Object): TranslateLoader {
  if (isPlatformBrowser(platformId)) {
    // Navigateur : charge les fichiers normalement
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  } else {
    // Serveur/prerender : retourne des objets vides pour éviter l’erreur
    return {
      getTranslation: () => of({})
    } as TranslateLoader;
  }
}