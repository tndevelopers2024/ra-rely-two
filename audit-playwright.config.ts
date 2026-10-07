import { defineConfig } from '@playwright/test';
import base from './playwright.config';
export default defineConfig({ ...base, reporter: [['list']], projects: [{ name: 'chrome', use: { ...base.projects?.[0]?.use, channel: 'chrome' } }] });
