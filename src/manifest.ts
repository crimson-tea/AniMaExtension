import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../package.json';

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === 'development' ? '[Dev] ' : ''} AniMa Extension`,
  description: 'Observe finished episodes on AbemaTV',
  version,
  content_scripts: [
    {
      matches: ['https://abema.tv/video/episode/*'],
      js: ['content/index.tsx'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
  },
  action: {
    default_popup: 'popup/popup.html',
  },
  permissions: ['storage', 'tabs'],
}));

export default manifest;
