import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';

interface Language {
  code: string
  label: string
  flag: string // peut être un emoji ou un path d’image
}

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [CommonModule, SelectModule, FormsModule ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitchComponent {

  private translate = inject(TranslateService)

  languages: Language[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ]

  selectedLang = this.languages[0].code

  constructor() {
    const currentLang = this.translate.currentLang || this.translate.defaultLang || 'en'
    const lang = this.languages.find(l => l.code === currentLang)
    this.selectedLang = lang ? lang.code : this.languages[0].code
  }

  onLangChange(code: string) {
    this.translate.use(code)
    this.selectedLang = code
  }

}
