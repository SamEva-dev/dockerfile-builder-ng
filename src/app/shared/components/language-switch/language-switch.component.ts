import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

interface Language {
  code: string
  label: string
  flag: string // peut être un emoji ou un path d’image
}

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitchComponent {

  private translate = inject(TranslateService);

  languages: Language[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  selectedLang = this.languages[0];

  constructor() {
    const currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
    const lang = this.languages.find(l => l.code === currentLang);
    this.selectedLang = lang || this.languages[0];
  }

  onLangChange(code: string) {
    const lang = this.languages.find(l => l.code === code);
    if (lang) {
      this.translate.use(lang.code);
      this.selectedLang = lang;
    }
  }

}
