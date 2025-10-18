# Adding a New Language

1. Add a new file `[langCode].json` to `src/locales` with `{}` (by default `en` is used as a fallback)
2. Import the new language file in `src/locales/config.ts`
3. Copy the content of `en.json`
4. Paste it into ChatGPT and request a translation to your target language.
5. Paste the translated content into `[langCode].json`
6. Run `yarn i18n`
7. Fill in or refine any missing or inaccurate translations.
8. Use the “Copy” button (if available) to copy the fixed content.
9. Paste the updated translations back into `[langCode].json.`
