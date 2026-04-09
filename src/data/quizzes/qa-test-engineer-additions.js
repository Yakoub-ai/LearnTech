export const additions = {
  beginner: [
    {
      question: 'According to the "Software Testing Explained in 100 Seconds" video, which analogy best describes what end-to-end testing does?',
      options: [
        'A code review that checks each function for correctness',
        'A robot that performs all the manual testing a human would do by clicking buttons and filling out forms in a simulated browser',
        'A static analyser that checks code without executing it',
        'A database validator that checks data integrity across tables'
      ],
      correctIndex: 1,
      explanation: 'The video describes end-to-end testing as "like having a robot to do all your manual testing for you" — it runs in a mock browser or device and simulates actual user behaviours such as clicking buttons and filling out forms. This captures the key idea that E2E tests replicate real user journeys through the full application stack, unlike unit tests that verify isolated functions.'
    },
    {
      question: 'In the "JavaScript Testing Introduction Tutorial", why does the instructor emphasise writing tests that check both the correct case and the opposite (or different-input) case?',
      options: [
        'To increase code coverage metrics without additional effort',
        'To avoid false positives — a function that always returns the same hardcoded value will pass a single assertion, but a second test with different inputs will expose the bug',
        'To satisfy the requirement that every test file must contain at least two tests',
        'Because assertion libraries like Jest require paired tests for each function'
      ],
      correctIndex: 1,
      explanation: 'The video demonstrates exactly this failure mode: after accidentally hardcoding a return value, the first test still passed because the expected output matched the hardcoded value. Only by adding a second test with different inputs (an empty name and null age) was the false positive exposed. This teaches that a single happy-path test is insufficient — you must check for the opposite or a different set of arguments to rule out accidental correctness.'
    },
    {
      question: 'The "Software Testing Explained in 100 Seconds" video mentions test-driven development (TDD). What does it say about TDD?',
      options: [
        'TDD eliminates the need for manual testing entirely',
        'TDD is scientifically proven to reduce defects and improve the maintainability of a codebase, but it does require some additional effort',
        'TDD is only suitable for backend code, not frontend applications',
        'TDD requires writing tests after the code is deployed to production'
      ],
      correctIndex: 1,
      explanation: 'The video states directly that test-driven development is "scientifically proven to reduce defects and improve the maintainability of a code base" but acknowledges that "it does require some additional effort." This balanced framing is important: TDD has genuine, measurable benefits, but it changes the workflow and requires discipline to adopt consistently.'
    },
    {
      question: 'In the test pyramid model, which layer should contain the greatest number of tests?',
      options: [
        'Unit tests',
        'Integration tests',
        'End-to-end (UI) tests',
        'Manual exploratory tests'
      ],
      correctIndex: 0,
      explanation: 'The test pyramid places unit tests at the base because they are fast, cheap to run, and should be the most numerous layer.'
    },
    {
      question: 'What is the "pesticide paradox" in software testing?',
      options: [
        'Running the same set of tests repeatedly will eventually stop finding new defects; tests must be regularly reviewed and updated',
        'Using automated testing tools kills off manual testing skills in the team',
        'Bug reports become less effective over time as developers become immune to them',
        'Test environments degrade in quality the longer they are used without rebuilding'
      ],
      correctIndex: 0,
      explanation: 'The pesticide paradox (ISTQB principle) means repeating identical tests stops revealing new bugs — you must evolve test cases, add new ones, and vary approaches.'
    },
    {
      question: 'What does "equivalence partitioning" mean in test case design?',
      options: [
        'Dividing input data into groups where all values in a group are expected to behave the same way',
        'Distributing test cases equally across all features of an application',
        'Splitting a large test suite into parallel execution streams',
        'Assigning each tester an equal share of the regression test pack'
      ],
      correctIndex: 0,
      explanation: 'Equivalence partitioning groups inputs so that testing one value from a partition is representative of all values in that partition, reducing redundant tests.'
    },
    {
      question: 'Which element is most critical for enabling a developer to reproduce a reported bug?',
      options: [
        'Clear, numbered steps to reproduce the issue',
        'The tester\'s personal opinion on how to fix the bug',
        'A lengthy narrative describing the general feature area',
        'The full source code of the feature being tested'
      ],
      correctIndex: 0,
      explanation: 'Reproducible steps are the most important part of a bug report — without them, developers cannot confirm or fix the defect.'
    },
  ],
  mid: [
    {
      question: 'According to the "JavaScript Testing Introduction Tutorial", what is the key distinction between a unit test and an integration test?',
      options: [
        'Unit tests use Jest; integration tests use a different framework',
        'Unit tests test a fully isolated piece of code with no dependencies; integration tests test how units work together, including interactions between functions that depend on each other',
        'Unit tests run in Node.js; integration tests run in a browser',
        'Unit tests check individual lines of code; integration tests check entire files'
      ],
      correctIndex: 1,
      explanation: 'The tutorial is precise about this distinction: a unit test verifies a single isolated unit (a function that takes input and returns output with no dependencies), while an integration test checks that two or more units work together correctly. The video\'s example of "check-and-generate" (which calls both validate-input and generate-text internally) illustrates integration testing: even if both units work individually, a logical error in how they are combined — such as inverting a conditional — will cause the integration test to fail while both unit tests still pass.'
    },
    {
      question: 'In the "Docker in 100 Seconds" video, what problem does Docker primarily solve for developers and QA engineers?',
      options: [
        'It speeds up the compilation of application source code',
        'It provides a visual interface for managing databases',
        'It reproduces environments consistently, solving the "it works on my machine" problem by packaging software with its dependencies into an image that runs identically anywhere',
        'It automatically writes unit tests for any Node.js application'
      ],
      correctIndex: 2,
      explanation: 'The video explicitly states that "the whole point of Docker is to solve problems like this by reproducing environments." The scenario it describes is familiar to QA engineers: an application works on the developer\'s machine but breaks on another machine with a different version of Node or different installed dependencies. A Docker image captures the exact environment as an immutable snapshot, ensuring that every developer, CI server, and test environment runs identical software stacks.'
    },
    {
      question: 'The "Docker in 100 Seconds" video describes Docker Compose. What specific problem does Docker Compose solve that a single Dockerfile cannot?',
      options: [
        'Docker Compose allows you to run containers on remote cloud servers',
        'Docker Compose manages running multiple containers together — for example, an application container and a database container — as a coordinated unit that starts and stops together',
        'Docker Compose generates Dockerfiles automatically from source code',
        'Docker Compose replaces the need for port forwarding when accessing a container'
      ],
      correctIndex: 1,
      explanation: 'The video introduces Docker Compose with the scenario where "your node app also needs to access a MySQL database." A single Dockerfile only defines one container. Docker Compose defines multiple services in a YAML file — the application, the database, and any volumes — and starts them all with "docker compose up" and shuts them all down with "docker compose down." For QA engineers, this is the standard pattern for spinning up a complete, isolated test environment that includes the application and all its dependencies in a single command.'
    },
    {
      question: 'How does Cypress differ architecturally from Selenium-based frameworks?',
      options: [
        'Cypress runs directly inside the browser, giving it native access to the DOM and network layer without a WebDriver',
        'Cypress communicates with browsers exclusively via the WebDriver Protocol like Selenium',
        'Cypress tests run in a Node.js process separate from the browser with no direct DOM access',
        'Cypress requires a separate hub server to distribute tests across browser nodes'
      ],
      correctIndex: 0,
      explanation: 'Cypress executes test code inside the browser context, enabling synchronous-style assertions, reliable auto-waiting, and direct network interception.'
    },
    {
      question: 'How does Newman extend Postman\'s capabilities for CI/CD integration?',
      options: [
        'Newman is a CLI tool that runs Postman collections from the command line in automated pipelines',
        'Newman is a Postman plugin that generates test code from API documentation',
        'Newman is a cloud service that hosts Postman mock servers',
        'Newman is Postman\'s built-in performance testing module'
      ],
      correctIndex: 0,
      explanation: 'Newman allows Postman collections to be executed in CI environments (GitHub Actions, Jenkins, etc.) and generates reports in JUnit or JSON formats.'
    },
    {
      question: 'What is a "test gate" in a CI pipeline and what does it enforce?',
      options: [
        'The build fails and deployment is blocked if test thresholds (e.g., coverage or pass rate) are not met',
        'All tests are run manually before the build can proceed',
        'Only unit tests are executed; integration tests are run separately after deployment',
        'Test results are sent to the team for approval before the pipeline continues'
      ],
      correctIndex: 0,
      explanation: 'Test gates automatically block deployments when quality criteria are not met, ensuring broken builds do not progress through the pipeline.'
    },
    {
      question: 'In Postman, what is the recommended way to handle bearer tokens when testing an authenticated REST API?',
      options: [
        'Store the token in an environment variable and reference it with {{token}} in the Authorization header',
        'Hardcode the token directly in each request\'s Authorization header',
        'Add the token as a query parameter in every request URL',
        'Create a separate Postman workspace for each token value'
      ],
      correctIndex: 0,
      explanation: 'Environment variables keep tokens out of request definitions, enable easy rotation, and prevent accidental exposure when sharing collections.'
    },
  ],
  senior: [
    {
      question: 'The "JavaScript Testing Introduction Tutorial" demonstrates end-to-end testing with Puppeteer. What specific capability does Puppeteer provide that unit and integration tests cannot?',
      options: [
        'Puppeteer can run tests faster than Jest by parallelising execution',
        'Puppeteer launches a real (or headless) browser, executes the full user flow including DOM interactions, and can assert on the actual rendered page content — verifying the entire stack from UI to backend',
        'Puppeteer generates test data automatically from the application schema',
        'Puppeteer replaces the need for assertion libraries by using browser-native APIs'
      ],
      correctIndex: 1,
      explanation: 'The tutorial shows Puppeteer opening a Chromium browser, navigating to the application URL, clicking into inputs, typing values, clicking the submit button, and then evaluating the resulting DOM to confirm that the correct element with the expected text content was created. This exercises every layer: the JavaScript event handlers, the DOM manipulation logic, and the rendered output. The tutorial also shows that Puppeteer can be run headlessly (without a visible window) for CI pipelines, or with a head (showing the browser) for debugging — and the video demonstrates the value of this when an error was discovered during the test run that would not have been caught by unit or integration tests alone.'
    },
    {
      question: 'Based on the "JavaScript Testing Introduction Tutorial", why does writing modular, testable code matter beyond just making tests easier to write?',
      options: [
        'Modular code reduces the binary file size of the deployed application',
        'Writing modular code is required by Jest and will cause test runner errors if not followed',
        'Being forced to write code that can be split into testable units drives better overall architecture: smaller, focused, loosely coupled modules that are easier to manage, reuse, and maintain',
        'Modular code allows tests to skip the compilation step, making the test suite faster'
      ],
      correctIndex: 2,
      explanation: 'The tutorial makes this point explicitly: writing testable code forces you to write modular code, "and ultimately it will make working with our code easier and it improves our code therefore since we are forced to follow certain patterns." The video demonstrates this by extracting logic from the add-user function into a separate check-and-generate function — not just to enable testing, but because the extraction produced a cleaner, more reusable design. For senior QA engineers, this is important: the value of test automation extends beyond defect detection to architectural improvement through the design pressure that writing tests creates.'
    },
    {
      question: 'In the "Docker in 100 Seconds" video, why does the instructor recommend copying package.json and running npm install BEFORE copying the rest of the application source code in a Dockerfile?',
      options: [
        'Because npm install must always be the first command in any Dockerfile by convention',
        'To exploit Docker\'s layer caching: since dependencies change infrequently, installing them first means Docker can reuse the cached layer on subsequent builds when only source code has changed, dramatically reducing build time',
        'Because the source code cannot be copied until the node_modules directory already exists',
        'To ensure the application can start before the source code is fully available'
      ],
      correctIndex: 1,
      explanation: 'The video explains this directly: "in Docker we actually want to install our dependencies first so they can be cached" and "we don\'t want to have to reinstall all of our node modules every time we change our app source code." Docker builds images layer by layer and caches unchanged layers. If source code is copied before running npm install, every source code change invalidates the npm install layer and forces a full dependency reinstall. Copying package.json first and running npm install means the dependency layer is only invalidated when package.json changes — which is far less frequent than application code changes. For QA engineers managing CI pipelines, this technique can reduce test environment build times from minutes to seconds.'
    },
    {
      question: 'What problem does contract testing with Pact solve?',
      options: [
        'It verifies that a consumer and provider agree on API behaviour without requiring both to be deployed simultaneously',
        'It validates that API documentation is accurate by comparing it to live responses',
        'It generates mock servers automatically from OpenAPI specifications',
        'It replaces end-to-end integration tests by running all services in a shared environment'
      ],
      correctIndex: 0,
      explanation: 'Pact consumer-driven contracts let teams test API interactions independently, catching breaking changes before integration without an integrated environment.'
    },
    {
      question: 'How does Quality Engineering (QE) differ from traditional Quality Assurance (QA)?',
      options: [
        'QE embeds quality throughout the entire development lifecycle using engineering practices, not just testing at the end',
        'QE focuses exclusively on automated testing, while QA includes manual testing',
        'QE is performed only by software architects, while QA is performed by dedicated testers',
        'QE applies only to hardware products, while QA applies to software'
      ],
      correctIndex: 0,
      explanation: 'Quality Engineering shifts quality left by integrating testing, observability, and quality practices into every stage — design, development, deployment, and operations.'
    },
    {
      question: 'What is "chaos engineering" and how does it relate to senior quality practice?',
      options: [
        'Deliberately injecting failures (network latency, service crashes) into a system to validate its resilience and recovery behaviour',
        'Running tests in a random order to discover ordering dependencies',
        'Deploying multiple versions of an application simultaneously to compare quality metrics',
        'Writing tests without a test plan to encourage creative defect discovery'
      ],
      correctIndex: 0,
      explanation: 'Chaos engineering is a quality engineering practice that proactively tests system resilience by simulating real-world failures before they occur in production. It reveals weaknesses that conventional tests cannot expose.'
    },
    {
      question: 'In a risk-based testing approach, how are test priorities determined?',
      options: [
        'By combining the likelihood of failure with the business impact of that failure',
        'By the order in which features appear in the product backlog',
        'By the personal preference of the most senior QA engineer on the team',
        'By the alphabetical order of the feature names in the specification'
      ],
      correctIndex: 0,
      explanation: 'Risk-based testing allocates effort to areas where failure is most probable and most consequential, maximising defect detection within time constraints.'
    },
  ],
}
