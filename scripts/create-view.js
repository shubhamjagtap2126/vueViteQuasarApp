// create-view.js
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';

import { fileURLToPath } from 'url'; // Import the necessary function

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname("..", __filename); // Get the directory name

const templatesDir = path.join( __dirname, 'src', 'templates');
console.log( templatesDir);

async function createView() {
  try {
    // ... (prompts for viewName, viewDisplayName, componentName, routePath)
    const { viewName } = await prompts({
      // Get viewName first
      type: 'text',
      name: 'viewName',
      message: 'Enter view name (e.g., product-details):',
      validate: (value) => value.length > 0
    })

    const { viewDisplayName } = await prompts({
      type: 'text',
      name: 'viewDisplayName',
      message: 'Enter view display name (e.g., Product Details):',
      validate: (value) => value.length > 0
    })

    const { componentName } = await prompts({
      // Get componentName next
      type: 'text',
      name: 'componentName',
      message: 'Enter component name (e.g., ProductDetails):',
      validate: (value) => value.length > 0
    })

    const { routePath } = await prompts({
      type: 'text',
      name: 'routePath',
      message: 'Enter route path (e.g., /product/:id):',
      validate: (value) => value.length > 0
    })

    const componentTemplatePath = path.join(templatesDir, 'component.template.vue')
    const viewTemplatePath = path.join(templatesDir, 'view.template.vue')

    const componentTemplate = await fs.readFile(componentTemplatePath, 'utf8')
    const viewTemplate = await fs.readFile(viewTemplatePath, 'utf8')

    const componentPath = path.join(__dirname, 'src', 'components', `${componentName}.vue`)
    const viewPath = path.join(__dirname, 'src', 'views', `${viewName}.vue`)

    await fs.outputFile(
      componentPath,
      componentTemplate.replace(/{{ componentName }}/g, componentName)
    ) // Use replace with regex /g for global replace
    console.log(chalk.green(`Component created: ${componentPath}`))

    await fs.outputFile(
      viewPath,
      viewTemplate
        .replace(/{{ viewName }}/g, viewName)
        .replace(/{{ viewDisplayName }}/g, viewDisplayName)
        .replace(/{{ componentName }}/g, componentName)
    )
    console.log(chalk.green(`View created: ${viewPath}`))

    // Router update (now with routerTemplate defined inside the function):
    const routerTemplate = `,
  {
    path: '/{{ routePath }}',
    name: '{{ viewName }}',
    component: () => import('@/views/{{ viewName }}.vue'),
  },
`

    const routerPath = path.join(__dirname, 'src', 'router.js') // Adjust path
    if (await fs.pathExists(routerPath)) {
      let routerContent = await fs.readFile(routerPath, 'utf8')
      const insertPoint = routerContent.lastIndexOf(']')

      if (insertPoint !== -1) {
        // Correct way to replace placeholders in the template string:
        const newRoute = routerTemplate
          .replace(/{{ routePath }}/g, viewDisplayName) // Replace all {{ viewDisplayName }}
          .replace(/{{ viewName }}/g, viewName) // Replace all {{ viewName }}

        const updatedRouterContent =
          routerContent.slice(0, insertPoint) + newRoute + routerContent.slice(insertPoint)
        await fs.writeFile(routerPath, updatedRouterContent, 'utf8')
        console.log(chalk.green(`Router updated: ${routerPath}`))
      } else {
        console.error(chalk.red('Could not find insertion point in router file.'))
      }
    } else {
      console.error(chalk.red('Router file not found.'))
    }
  } catch (error) {
    console.error(chalk.red('Error creating view:', error))
  }
}

createView()
