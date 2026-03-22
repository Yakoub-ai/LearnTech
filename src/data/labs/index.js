/**
 * Combined interactive labs index
 * Re-exports all per-role and per-language lab arrays as a single flat array
 */
import { labs as aiEngineerLabs } from './ai-engineer-labs.js'
import { labs as backendDeveloperLabs } from './backend-developer-labs.js'
import { labs as dataEngineerLabs } from './data-engineer-labs.js'
import { labs as dataScientistLabs } from './data-scientist-labs.js'
import { labs as devopsLabs } from './devops-platform-engineer-labs.js'
import { labs as frontendDeveloperLabs } from './frontend-developer-labs.js'
import { labs as marketingTechLabs } from './marketing-technology-developer-labs.js'
import { labs as mlEngineerLabs } from './ml-engineer-labs.js'
import { labs as qaTestEngineerLabs } from './qa-test-engineer-labs.js'
import { labs as securityEngineerLabs } from './security-engineer-labs.js'
import { labs as techLeadArchitectLabs } from './tech-lead-architect-labs.js'
import { labs as pythonLabs } from './python-labs.js'
import { labs as javascriptLabs } from './javascript-labs.js'
import { labs as htmlCssLabs } from './html-css-labs.js'
import { labs as sqlLabs } from './sql-labs.js'
import { labs as typescriptLabs } from './typescript-labs.js'

export const interactiveLabs = [
  ...aiEngineerLabs,
  ...backendDeveloperLabs,
  ...dataEngineerLabs,
  ...dataScientistLabs,
  ...devopsLabs,
  ...frontendDeveloperLabs,
  ...marketingTechLabs,
  ...mlEngineerLabs,
  ...qaTestEngineerLabs,
  ...securityEngineerLabs,
  ...techLeadArchitectLabs,
  ...pythonLabs,
  ...javascriptLabs,
  ...htmlCssLabs,
  ...sqlLabs,
  ...typescriptLabs,
]
