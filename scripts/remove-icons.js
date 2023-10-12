#!/usr/bin/env node
import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const iconsPath = join(fileURLToPath(import.meta.url), '../../node_modules/@patternfly/elements/pf-icon/icons/');
if (fs.existsSync(iconsPath)) {
  fs.rmdirSync(iconsPath, { recursive: true });
}