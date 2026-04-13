import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_CONFIG } from '../../core/data/content.data';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing" style="background-image: url('images/background_1.jpg')">
      <div class="landing-overlay"></div>
      <div class="landing-content">
        <h1 class="landing-title">{{ title }}</h1>
        <div class="landing-buttons">
          <a class="lang-btn" routerLink="/en">
            <span class="btn-label">English</span>
            <span class="btn-sub">Read the chronicles</span>
          </a>
          <a class="lang-btn" routerLink="/fr">
            <span class="btn-label">Français</span>
            <span class="btn-sub">Lire les chroniques</span>
          </a>
          <a class="lang-btn comments-btn" routerLink="/comments">
            <span class="btn-label">Comentarios</span>
            <span class="btn-sub">Notas de traducción</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing {
      min-height: 100vh;
      background-color: var(--color-paper);
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .landing-overlay {
      position: fixed;
      inset: 0;
      background: linear-gradient(to bottom, rgba(248,244,239,0.7) 0%, rgba(248,244,239,0.88) 100%);
      pointer-events: none;
      z-index: 0;
    }
    .landing-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: var(--space-xl);
      max-width: 640px;
      width: 100%;
    }
    .landing-title {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 5vw, 3rem);
      font-weight: 500;
      color: var(--color-ink);
      line-height: 1.2;
      letter-spacing: 0.02em;
      margin: 0 0 var(--space-2xl) 0;
    }
    .landing-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .lang-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-lg) var(--space-xl);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: rgba(248, 244, 239, 0.85);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: var(--shadow-card);
    }
    .lang-btn:hover {
      background: rgba(245, 240, 232, 0.95);
      border-color: var(--color-accent);
      box-shadow: var(--shadow-soft);
      transform: translateY(-2px);
    }
    .btn-label {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 500;
      color: var(--color-ink);
      letter-spacing: 0.03em;
    }
    .btn-sub {
      font-family: var(--font-body);
      font-size: 0.9rem;
      color: var(--color-ink-muted);
      margin-top: var(--space-xs);
      font-style: italic;
    }
    .comments-btn {
      border-color: var(--color-border-soft);
    }
    .comments-btn .btn-label {
      font-size: 1.4rem;
      color: var(--color-ink-muted);
    }
  `]
})
export class LandingComponent {
  title = PAGE_CONFIG.title.es;
}
