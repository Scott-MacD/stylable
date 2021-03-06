import { browserFunctions, StylableProjectRunner } from '@stylable/e2e-test-kit';
import { expect } from 'chai';
import { join } from 'path';

const project = 'split-chunks-2';

describe(`(${project})`, () => {
    const projectRunner = StylableProjectRunner.mochaSetup(
        {
            projectDir: join(__dirname, 'projects', project),
            port: 3001,
            puppeteerOptions: {
                // headless: false,
                // devtools: true
            }
        },
        before,
        afterEach,
        after
    );

    it('renders css', async () => {
        const { page } = await projectRunner.openInBrowser();
        const styleElements = await page.evaluate(browserFunctions.getStyleElementsMetadata);

        expect(styleElements).to.eql([
            {
                depth: '1',
                id: './node_modules/lib/test.st.css'
            },
            {
                depth: '2',
                id: './node_modules/lib/index.st.css'
            },
            {
                depth: '3',
                id: './src/index.st.css'
            }
        ]);
    });
});
